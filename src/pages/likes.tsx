import { useEffect, useState } from 'react'
import { PostUserAggregate } from '@/types'
import { GetServerSideProps } from 'next'
import { json } from '@/utils/serde'
import { getPost } from '@/services/api/posts'
import { prismaClient } from '@/shared/prisma'
import { useStorage } from '@/utils/local-storage'
import BaseLayout from '@/layouts/BaseLayout'
import AsideSearchForm from '@/components/AsideSearchForm'
import AsideGithubCard from '@/components/AsideGithubCard'
import AsidePosts from '@/components/AsidePosts'
import PostCard from '@/components/posts/PostCard'

type LikesProps = {
  mostViewedPosts: PostUserAggregate[]
}

export default function Likes({ mostViewedPosts }: LikesProps) {
  const { storage } = useStorage('@asynched:posts', {
    likes: [] as string[],
  })

  const [posts, setPosts] = useState<PostUserAggregate[]>([])

  useEffect(() => {
    const likes = storage.likes

    Promise.allSettled(likes.map(getPost)).then((posts) => {
      const output = []

      for (const post of posts) {
        if (post.status === 'fulfilled') {
          output.push(post.value)
        }
      }

      setPosts(output)
    })
  }, [storage])

  return (
    <BaseLayout
      title="Asynched | Suas curtidas"
      aside={
        <>
          <AsideSearchForm />
          <AsideGithubCard />
          <AsidePosts posts={mostViewedPosts} />
        </>
      }
    >
      <h1 className="mb-4 text-4xl font-bold tracking-tighter">
        Posts que você curtiu
      </h1>
      <p className="mb-8 text-zinc-600">Veja abaixo os posts que você curtiu</p>
      <section title="Posts curtidos" className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </BaseLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const mostViewedPost = await prismaClient.post.findMany({
    orderBy: { views: 'desc' },
    take: 3,
    include: {
      author: true,
    },
  })

  return {
    props: {
      mostViewedPosts: json(mostViewedPost),
    },
  }
}
