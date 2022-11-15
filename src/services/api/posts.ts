import { PostUserAggregate } from '@/types'

type CreatePostDto = {
  title: string
  content: string
  description: string
  tags: string[]
}

type UpdatePostDto = CreatePostDto

export const deletePost = async (id: string) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete post')
  }
}

export const createPost = async (post: CreatePostDto) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  if (!response.ok) {
    throw new Error('Failed to create post')
  }
}

export const updatePost = async (id: string, post: UpdatePostDto) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  if (!response.ok) {
    throw new Error('Failed to update post')
  }
}

export const getPost = async (id: string): Promise<PostUserAggregate> => {
  const response = await fetch(`/api/posts/${id}`)

  if (!response.ok) {
    throw new Error('Failed to get post')
  }

  return response.json()
}
