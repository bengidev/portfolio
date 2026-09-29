export interface Education {
  school: string
  href?: string
  period: string
  degree?: string
  /** Coursework / subject chips. */
  tags: string[]
}

export const education: Education[] = [
  {
    school: 'Your University',
    period: '2015—2019',
    degree: 'BSc Computer Science',
    tags: ['Algorithms', 'Data Structures', 'Distributed Systems', 'Databases'],
  },
  {
    school: 'Your High School',
    period: '2011—2015',
    tags: ['Mathematics', 'Physics'],
  },
]
