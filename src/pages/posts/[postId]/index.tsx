import Markdown from 'react-markdown'
import GithubFlavored from 'remark-gfm'
import type { GetServerSideProps } from 'next'

import { json } from '@/utils/serde'
import { formatDate } from '@/utils/dates'
import { prismaClient } from '@/shared/prisma'
import type { PostUserAggregate } from '@/types'
import { useStorage } from '@/utils/local-storage'

import Link from 'next/link'
import BaseLayout from '@/layouts/BaseLayout'
import AsideSearchForm from '@/components/AsideSearchForm'
import AsideGithubCard from '@/components/AsideGithubCard'
import {
  ChevronRightIcon,
  HeartIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from '@heroicons/react/24/solid'
import AsidePosts from '@/components/AsidePosts'

type PostPageProps = {
  post: PostUserAggregate
  mostViewedPosts: PostUserAggregate[]
}

export default function PostPage({ post, mostViewedPosts }: PostPageProps) {
  const { storage: posts, mergeStorage } = useStorage('@asynched:posts', {
    likes: [] as string[],
    bookmarks: [] as string[],
  })

  const toggleLike = (postId: string) => {
    if (posts.likes.includes(postId)) {
      mergeStorage({
        likes: posts.likes.filter((id) => id !== postId),
      })
    } else {
      mergeStorage({
        likes: [...posts.likes, postId],
      })
    }
  }

  const toggleBookmark = (postId: string) => {
    if (posts.bookmarks.includes(postId)) {
      mergeStorage({
        bookmarks: posts.bookmarks.filter((id) => id !== postId),
      })
    } else {
      mergeStorage({
        bookmarks: [...posts.bookmarks, postId],
      })
    }
  }

  return (
    <BaseLayout
      title={`Asynched | ${post.title}`}
      aside={
        <>
          <AsideSearchForm />
          <AsideGithubCard />
          <AsidePosts posts={mostViewedPosts} />
        </>
      }
      heading={
        <div className="flex items-center gap-2 text-zinc-500">
          <Link href="/">Home</Link>
          <ChevronRightIcon className="h-4 w-4" />
          <Link href="/">Posts</Link>
          <ChevronRightIcon className="h-4 w-4" />
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </div>
      }
    >
      <section title="post-heading" className="mb-8">
        <div className="mb-8 flex items-center gap-4">
          <img
            className="h-16 w-16 rounded-full"
            src={post.author.avatar}
            alt={post.author.name}
          />
          <div>
            <h2 className="text-xl">{post.author.name}</h2>
            <p className="text-zinc-500">
              {formatDate(post.createdAt)} · 5 minutos ⭐
            </p>
          </div>
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tighter">
          {post.title}
        </h1>
        <p className="text-2xl text-zinc-500">{post.description}</p>
      </section>
      <Markdown
        remarkPlugins={[GithubFlavored]}
        className="
          prose
          prose-zinc
          mb-8
          overflow-hidden
          prose-headings:tracking-tighter
          prose-pre:font-mono
          prose-pre:text-xs
        "
      >
        {post.content}
      </Markdown>
      <div className="sticky bottom-20 mx-auto flex max-w-min gap-4 self-center rounded-full bg-white py-2 px-4 shadow-xl lg:bottom-4">
        <button title="Gostei" onClick={() => toggleLike(post.id)}>
          {posts.likes.includes(post.id) ? (
            <HeartIconSolid className="h-5 w-5 cursor-pointer text-zinc-900" />
          ) : (
            <HeartIcon className="h-5 w-5 cursor-pointer text-zinc-500" />
          )}
        </button>
        <button title="Ler depois" onClick={() => toggleBookmark(post.id)}>
          {posts.bookmarks.includes(post.id) ? (
            <BookmarkIconSolid className="h-5 w-5 cursor-pointer text-zinc-900" />
          ) : (
            <BookmarkIcon className="h-5 w-5 cursor-pointer text-zinc-500" />
          )}
        </button>
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params!.postId as string

  const post = await prismaClient.post.findFirst({
    where: { id },
    include: { author: true },
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  const mostViewedPosts = await prismaClient.post.findMany({
    orderBy: { views: 'desc' },
    include: {
      author: true,
    },
    take: 5,
  })

  return {
    props: {
      post: json(post),
      mostViewedPosts: json(mostViewedPosts),
    },
  }
}
