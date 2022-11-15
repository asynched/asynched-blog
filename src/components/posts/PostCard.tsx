import type { Post, User } from '@prisma/client'
import { formatDate } from '@/utils/dates'

import Truthy from '@/components/utils/Truthy'
import Link from 'next/link'

type PostCardProps = {
  post: Post & { author: User }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`posts/${post.id}`} className="border-b pb-4">
      <div className="mb-4 flex items-center gap-2">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="h-8 w-8 rounded-full"
        />
        <p className="text-sm text-zinc-500">
          <span className="text-zinc-900">{post.author.name}</span> ·&nbsp;
          <time className="text-zinc-500" dateTime="2021-01-01">
            {formatDate(post.createdAt)}
          </time>{' '}
          ⭐
        </p>
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tighter">{post.title}</h1>
      <p className="mb-8 text-zinc-600">{post.description}</p>
      <div className="flex items-center gap-2">
        <Truthy cond={post.tags.length > 0}>
          {() => (
            <span className="rounded-full bg-zinc-100 py-1 px-2 text-xs text-zinc-700">
              {post.tags[0]}
            </span>
          )}
        </Truthy>
        <span className="text-sm text-zinc-500">5 min de leitura</span>
      </div>
    </Link>
  )
}
