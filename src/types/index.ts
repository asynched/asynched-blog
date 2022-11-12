export type Post = {
  author: {
    name: string
    imageUrl: string
  }
  title: string
  description: string
  tags: string[]
  postedAt: string
  estimateReadingTime: number
}
