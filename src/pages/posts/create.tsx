import { useState } from 'react'
import { preventDefault } from '@/utils/ui'
import { createPost } from '@/services/api/posts'
import { pageRequiresAuth } from '@/middlewares/auth'

import BaseLayout from '@/layouts/BaseLayout'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify'
import AsideGithubCard from '@/components/AsideGithubCard'
import AsideSearchForm from '@/components/AsideSearchForm'
import { useRouter } from 'next/router'

export default function CreatePost() {
  const router = useRouter()
  const [tagsInput, setTagsInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = async () => {
    const form = document.forms[0]!
    const formData = new FormData(form)

    toast
      .promise(
        createPost({
          title: formData.get('title') as string,
          content: formData.get('content') as string,
          description: formData.get('description') as string,
          tags,
        }),
        {
          pending: 'Criando post',
          error: 'Não foi possível criar o post',
          success: 'Post criado com sucesso',
        }
      )
      .then(() => router.push('/'))
  }

  const handleUpdateTags = (text: string) => {
    if (!text.includes(' ')) {
      return setTagsInput(text)
    }

    if (tags.length >= 5) {
      return
    }

    const tag = text.trim()

    if (tags.includes(tag)) {
      return
    }

    setTags([...tags, tag])
    setTagsInput('')
  }

  return (
    <BaseLayout
      title="Asynched | Editar post"
      aside={
        <>
          <AsideSearchForm />
          <AsideGithubCard />
        </>
      }
    >
      <ToastContainer />
      <form onSubmit={preventDefault(handleSubmit)}>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tighter">Criar post</h1>
          <button
            type="submit"
            className="rounded-full bg-green-600 py-2 px-4 text-sm text-white"
          >
            Salvar
          </button>
        </div>
        <input
          id="title"
          name="title"
          type="text"
          className="mb-2 block text-4xl font-bold tracking-tighter outline-none"
          placeholder="Título"
        />
        <input
          id="description"
          name="description"
          type="text"
          className="mb-4 block w-full text-2xl text-zinc-500 outline-none"
          placeholder="Descrição"
        />
        <div className="mb-8">
          <input
            type="text"
            className="mb-2 outline-none"
            placeholder="Tags"
            value={tagsInput}
            onChange={(event) => handleUpdateTags(event.target.value)}
          />
          <ul className="flex gap-2">
            {tags.map((tag, idx) => (
              <li
                className="flex items-center gap-1 bg-zinc-100 py-1 px-2 text-xs text-zinc-500"
                key={tag}
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() =>
                    setTags(tags.filter((_, $idx) => $idx !== idx))
                  }
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <textarea
          id="content"
          name="content"
          className="block w-full text-zinc-600 outline-none"
          placeholder="Conteúdo"
          rows={24}
        />
      </form>
    </BaseLayout>
  )
}

export const getServerSideProps = pageRequiresAuth()
