import { FaGithub } from 'react-icons/fa'

import { Post } from '@/types'
import Navbar from '@/components/Navbar'
import PostCard from '@/components/posts/PostCard'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const post: Post = {
    author: {
      name: 'Eder Lima',
      imageUrl: 'https://github.com/asynched.png?size=24',
    },
    description:
      'Build a NestJS app for authentication with Postgres, JWT, and environment variables — Sometimes, NestJS can become kinda overwhelming as a beginner.',
    title: 'NestJS: Authentication with JWT and Postgres',
    estimateReadingTime: 9,
    tags: ['NestJS'],
    postedAt: '1 de Janeiro de 2022',
  }

  return (
    <div className="relative flex max-w-screen-2xl mx-auto text-zinc-900 ">
      <Navbar />
      <main className="flex-1 p-8 max-w-3xl mx-auto">
        <div className="mb-8 p-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded shadow-lg shadow-blue-200 text-center">
          <p>Bem vindo ao meu blog!</p>
          <h1 className="text-4xl font-bold tracking-tighter">@Asynched</h1>
        </div>
        <div className="mb-12 pb-2 border-b">
          <h2 className="text-2xl font-bold tracking-tighter">Novidades</h2>
        </div>
        <section title="posts" className="grid gap-8">
          <PostCard post={post} />
          <PostCard post={post} />
          <PostCard post={post} />
          <PostCard post={post} />
          <PostCard post={post} />
        </section>
      </main>
      <aside
        className="
          p-8
          hidden
          w-96
          h-screen
          border-l
          sticky
          top-0

          xl:block
        "
      >
        <form className="mb-8 border rounded-full flex items-center gap-4 px-4">
          <MagnifyingGlassIcon className="w-4 h-4" />
          <input
            type="text"
            className="outline-none py-2"
            placeholder="Pesquise aqui..."
          />
        </form>
        <div className="relative p-8 bg-gray-900 text-white rounded">
          <h1 className="mb-2 text-2xl font-bold tracking-tighter leading-none">
            See the project on GitHub
          </h1>
          <p>Click here to check it!</p>
          <FaGithub className="h-16 w-16 absolute bottom-8 right-8 opacity-25" />
        </div>
      </aside>
    </div>
  )
}
