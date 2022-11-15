import type { User, Post } from '@prisma/client'
import { formatDate } from '@/utils/dates'
import Link from 'next/link'

type AsidePostCardProps = {
  post: Post & { author: User }
}

export default function AsidePostCard({ post }: AsidePostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="mb-2 flex items-center gap-2">
        <img
          className="h-6 w-6 rounded-full"
          src={post.author.avatar}
          alt={post.author.name}
        />
        <p className="text-sm text-zinc-500">
          <span className="text-zinc-900">{post.author.name}</span> ·{' '}
          {formatDate(post.createdAt)}
        </p>
      </div>
      <h3 className="text-lg font-bold leading-none tracking-tighter">
        {post.title}
      </h3>
    </Link>
  )
}
