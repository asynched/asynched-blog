import { GetServerSideProps } from 'next'

import { json } from '@/utils/serde'
import { prismaClient } from '@/shared/prisma'
import type { PostUserAggregate } from '@/types'

import BaseLayout from '@/layouts/BaseLayout'
import PostCard from '@/components/posts/PostCard'
import AsideSearchForm from '@/components/AsideSearchForm'
import AsideGithubCard from '@/components/AsideGithubCard'
import AsidePosts from '@/components/AsidePosts'

type HomePageProps = {
  posts: PostUserAggregate[]
  mostViewedPosts: PostUserAggregate[]
}

export default function Home({ posts, mostViewedPosts }: HomePageProps) {
  return (
    <BaseLayout
      title="Asynched | Home"
      aside={
        <>
          <AsideSearchForm />
          <AsideGithubCard />
          <AsidePosts posts={mostViewedPosts} />
        </>
      }
    >
      <div className="mb-8 rounded bg-gradient-to-r from-sky-500 to-blue-600 p-8 text-center text-white shadow-lg shadow-blue-200">
        <p>Bem vindo ao meu blog!</p>
        <h1 className="text-4xl font-bold tracking-tighter">@Asynched</h1>
      </div>
      <div className="mb-12 border-b pb-2">
        <h2 className="text-2xl font-bold tracking-tighter">Novidades</h2>
      </div>
      <section title="posts" className="grid gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </BaseLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prismaClient.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
  })
  const mostViewedPosts = await prismaClient.post.findMany({
    orderBy: { views: 'desc' },
    take: 3,
    include: {
      author: true,
    },
  })

  return {
    props: {
      mostViewedPosts: json(mostViewedPosts),
      posts: json(posts),
    },
  }
}
