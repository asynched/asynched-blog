import { useState } from 'react'
import { useRouter } from 'next/router'

import type { Post } from '@/types'
import useForm from '@/hooks/useForm'
import { json } from '@/utils/serde'
import useToggle from '@/hooks/useToggle'
import { noop, chain } from '@/utils/functional'
import { preventDefault } from '@/utils/ui'
import { prismaClient } from '@/shared/prisma'
import { pageRequiresAuth } from '@/middlewares/auth'
import { deletePost, updatePost } from '@/services/api/posts'

import BaseLayout from '@/layouts/BaseLayout'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify'
import DeletePostModal from '@/components/modals/posts/DeletePostModal'

type EditPostProps = {
  post: Post
}

export default function EditPost({ post }: EditPostProps) {
  const router = useRouter()
  const { state: modal, toggle: toggleModal } = useToggle(false)
  const { form, register } = useForm({
    title: post.title,
    content: post.content,
    description: post.description,
  })

  const [tagsInput, setTagsInput] = useState('')
  const [tags, setTags] = useState<string[]>(post.tags)

  const handleDelete = () => {
    toast
      .promise(deletePost(post.id), {
        pending: 'Apagando post...',
        success: 'Post apagado',
        error: 'Erro ao apagar post',
      })
      .then(() => router.push('/'))
  }

  const handleUpdate = () => {
    toast.promise(
      updatePost(post.id, {
        title: form.title,
        content: form.content,
        description: form.description,
        tags: tags,
      }),
      {
        pending: 'Atualizando post...',
        success: 'Post atualizado',
        error: 'Erro ao atualizar post',
      }
    )
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
    <BaseLayout title="Asynched | Editar post" aside={<></>}>
      <ToastContainer />
      <DeletePostModal
        display={modal}
        onClose={toggleModal}
        onDelete={chain(toggleModal, handleDelete)}
      />
      <form onSubmit={preventDefault(noop)}>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tighter">Editar post</h1>
          <div className="flex items-center gap-2 ">
            <button
              type="button"
              onClick={toggleModal}
              className="rounded-full bg-red-600 py-2 px-4 text-sm text-white"
            >
              Deletar
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-full bg-green-600 py-2 px-4 text-sm text-white"
            >
              Salvar
            </button>
          </div>
        </div>
        <input
          id="title"
          name="title"
          type="text"
          className="mb-2 block text-4xl font-bold tracking-tighter outline-none"
          placeholder="Título"
          {...register('title')}
        />
        <input
          id="description"
          name="description"
          type="text"
          className="mb-4 block w-full text-2xl text-zinc-500 outline-none"
          placeholder="Descrição"
          {...register('description')}
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
          {...register('content')}
        />
      </form>
    </BaseLayout>
  )
}

export const getServerSideProps = pageRequiresAuth(async (ctx) => {
  const id = ctx.params!.postId as string

  const post = await prismaClient.post.findFirst({
    where: {
      id,
    },
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: json(post),
    },
  }
})
