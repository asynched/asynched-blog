import type { User, Post } from '@prisma/client'

export type { User, Post }

export type PostUserAggregate = Post & {
  author: User
}
