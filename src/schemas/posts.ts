import { z } from 'zod'

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
})

export type PostDto = z.infer<typeof postSchema>
