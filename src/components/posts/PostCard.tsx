import { Post } from '@/types'
import Truthy from '@/components/utils/Truthy'

type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="pb-4 border-b">
      <div className="mb-4 flex gap-2 items-center">
        <img
          src={post.author.imageUrl}
          alt={post.author.name}
          className="rounded-full"
        />
        <p className="text-sm text-zinc-500">
          <span className="text-zinc-900">{post.author.name}</span> ·&nbsp;
          <time className="text-zinc-500" dateTime="2021-01-01">
            {post.postedAt}
          </time>{' '}
          ⭐
        </p>
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tighter">{post.title}</h1>
      <p className="mb-8 text-zinc-600">{post.description}</p>
      <div className="flex items-center gap-2">
        <Truthy cond={post.tags.length > 0}>
          {() => (
            <span className="text-zinc-700 text-xs py-1 px-2 bg-zinc-100 rounded-full">
              {post.tags[0]}
            </span>
          )}
        </Truthy>
        <span className="text-zinc-500 text-sm">
          {post.estimateReadingTime} min de leitura
        </span>
      </div>
    </div>
  )
}
