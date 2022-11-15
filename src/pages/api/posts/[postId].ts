import { prismaClient } from '@/shared/prisma'
import { chain, route, Middleware } from '@/middlewares'
import { endpointRequiresAuth } from '@/middlewares/auth'
import { validate } from '@/middlewares/validate'
import { PostDto, postSchema } from '@/pages/schemas/posts'

const handleDeletePost: Middleware = async (req, res) => {
  const postId = req.query.postId as string

  await prismaClient.post.delete({
    where: {
      id: postId,
    },
  })

  return res.status(204).json({
    message: 'Successfully deleted',
  })
}

const handleUpdatePost: Middleware = async (req, res) => {
  const postId = req.query.postId as string
  const post = req.body as PostDto

  await prismaClient.post.update({
    where: {
      id: postId,
    },
    data: {
      title: post.title,
      description: post.description,
      content: post.content,
      tags: {
        set: post.tags,
      },
    },
  })

  return res.status(200).json({
    message: 'Successfully updated',
  })
}

const handleGetPost: Middleware = async (req, res) => {
  const postId = req.query.postId as string

  const post = await prismaClient.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  })

  return res.status(200).json(post)
}

const handler = chain(
  route({
    get: handleGetPost,
    delete: chain(endpointRequiresAuth(), handleDeletePost),
    put: chain(endpointRequiresAuth(), validate(postSchema), handleUpdatePost),
  })
)

export default handler
