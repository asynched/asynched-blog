import { PostUserAggregate } from '@/types'
import AsidePostCard from '@/components/posts/AsidePostCard'

type AsidePostsProps = {
  posts: PostUserAggregate[]
}

export default function AsidePosts({ posts }: AsidePostsProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold leading-none tracking-tighter">
        Veja mais
      </h2>
      <section title="Recomendados" className="grid gap-8">
        {posts.map((post) => (
          <AsidePostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  )
}
