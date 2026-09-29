import { useMemo } from 'react'

/**
 * BTRD — an isometric block wordmark.
 *
 * Letters are built on a grid, merged into non-overlapping rectangles,
 * projected isometrically, then extruded downward. Upward faces carry a 45°
 * hatch; the two faces nearest the viewer are filled solid to read as depth.
 *
 * Faces are filled but *not* stroked. Stroking every rectangle would draw the
 * internal seams between merged cells and the mark would read as a wireframe
 * rather than as solid letters — the fill contrast alone does the work.
 *
 * Geometry is memoised; it is a few dozen rectangles.
 */

/* ------------------------------------------------------------------ *
 * Letterforms
 *
 * Rectangles in letter space: x runs 0→4 across the glyph, y runs 0→6 down
 * it. Overlaps are expected — `decompose` merges them.
 * ------------------------------------------------------------------ */

type Rect = readonly [x: number, y: number, w: number, h: number]

const GLYPHS: Record<string, Rect[]> = {
  B: [
    [0, 0, 1, 6], // stem
    [0, 0, 3.2, 1], // foot
    [0, 2.5, 3.2, 1], // waist
    [0, 5, 3.2, 1], // head
    [2.2, 1, 1, 1.5], // lower bowl
    [2.2, 3.5, 1, 1.5], // upper bowl
  ],
  T: [
    [0, 5, 4, 1], // cap
    [1.5, 0, 1, 5], // stem
  ],
  R: [
    [0, 0, 1, 6], // stem
    [0, 0, 3.2, 1], // foot
    [0, 2.5, 3.2, 1], // waist
    [0, 5, 3.2, 1], // head
    [2.2, 3.5, 1, 1.5], // upper bowl
    [2.2, 0, 1.2, 1.3], // leg
    [3, 0, 1.1, 0.9], // foot of the leg
  ],
  D: [
    [0, 0, 1, 6], // stem
    [0, 0, 3, 1], // foot
    [0, 5, 3, 1], // head
    [2, 1, 1, 4], // spine
  ],
}

const LETTERS = 'BTRD'
const ADVANCE = 5.0 // glyph width + gap

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */

type Point = readonly [number, number]

/**
 * Oblique (2.5D) projection.
 *
 * Letterforms stay upright and on a horizontal baseline so a four-letter word
 * still reads at a glance, and depth is carried by an isometric extrusion
 * offset up-and-right. Laying the letters flat in a true isometric plane —
 * the way the two-letter reference mark is built — spreads four letters across
 * a long diagonal that will not fit a narrow column.
 */
const EX = 1.5 // extrusion, right
const EY = 0.85 // extrusion, up

const front = (x: number, y: number, w: number, h: number): Point[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
]

/**
 * Merge overlapping rectangles into non-overlapping ones.
 *
 * Cuts the bounding box at every rect edge, fills the resulting cells, then
 * greedily re-merges horizontal runs and stacks identical runs vertically.
 */
function decompose(rects: Rect[]): Rect[] {
  const xs = [...new Set(rects.flatMap(([x, , w]) => [x, x + w]))].sort((a, b) => a - b)
  const ys = [...new Set(rects.flatMap(([, y, , h]) => [y, y + h]))].sort((a, b) => a - b)

  const filled: boolean[][] = ys
    .slice(0, -1)
    .map((y0) =>
      xs.slice(0, -1).map((x0) => {
        const mx = x0 + 1e-6
        const my = y0 + 1e-6
        return rects.some(([x, y, w, h]) => mx >= x && mx < x + w && my >= y && my < y + h)
      }),
    )

  const out: Rect[] = []
  for (let j = 0; j < filled.length; j++) {
    let i = 0
    while (i < filled[j].length) {
      if (!filled[j][i]) {
        i++
        continue
      }
      let end = i
      while (end + 1 < filled[j].length && filled[j][end + 1]) end++

      let height = 1
      outer: while (j + height < filled.length) {
        for (let k = i; k <= end; k++) if (!filled[j + height][k]) break outer
        height++
      }

      out.push([xs[i], ys[j], xs[end + 1] - xs[i], ys[j + height] - ys[j]])
      for (let jj = j; jj < j + height; jj++) for (let k = i; k <= end; k++) filled[jj][k] = false
      i = end + 1
    }
  }
  return out
}

const toPath = (points: Point[]) =>
  points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ') + ' Z'

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export function BtrdMark({ className }: { className?: string }) {
  const { tops, sides, bounds } = useMemo(() => {
    const topPaths: string[] = []
    const sidePaths: string[] = []
    const seen: Point[] = []

    LETTERS.split('').forEach((char, index) => {
      const ox = index * ADVANCE
      for (const [x, y, w, h] of decompose(GLYPHS[char])) {
        const f = front(ox + x, y, w, h)
        // Extruded copies, pushed up-and-right.
        const back = f.map(([px, py]) => [px + EX, py - EY] as Point)

        // Top face: the front top edge swept back. Right face: front right edge
        // swept back. The other two would be hidden behind the front face.
        sidePaths.push(toPath([f[0], f[1], back[1], back[0]]))
        sidePaths.push(toPath([f[1], f[2], back[2], back[1]]))
        topPaths.push(toPath(f))

        seen.push(...f, ...back)
      }
    })

    const xs = seen.map((p) => p[0])
    const ys = seen.map((p) => p[1])
    const pad = 0.5
    return {
      tops: topPaths,
      sides: sidePaths,
      bounds: [
        Math.min(...xs) - pad,
        Math.min(...ys) - pad,
        Math.max(...xs) + pad,
        Math.max(...ys) + pad,
      ] as const,
    }
  }, [])

  const [bx, by, bw, bh] = bounds

  return (
    <svg
      viewBox={`${bx} ${by} ${bw} ${bh}`}
      fill="none"
      className={className}
      role="img"
      aria-label="BTRD"
    >
      <defs>
        {/* Stroke colour comes from a token so the hatch themes with the page. */}
        <pattern
          id="btrd-hatch"
          width="0.5"
          height="0.5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="0.5"
            stroke="var(--foreground)"
            strokeOpacity="0.28"
            strokeWidth="0.1"
          />
        </pattern>
      </defs>

      {/* Extruded faces first so the top faces overlap their upper edges. */}
      <g className="fill-foreground/[0.10]">
        {sides.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      {/* Solid base under the hatch, so the letterforms read as solid blocks
          rather than as a field of loose diagonal lines. */}
      <g className="fill-foreground/[0.05]">
        {tops.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="url(#btrd-hatch)">
        {tops.map((d, i) => (
          <path key={`h${i}`} d={d} />
        ))}
      </g>
    </svg>
  )
}
