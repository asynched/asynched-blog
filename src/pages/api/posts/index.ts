import { chain, method } from '@/middlewares'
import { prismaClient } from '@/shared/prisma'
import { validate } from '@/middlewares/validate'
import { endpointRequiresAuth } from '@/middlewares/auth'
import { PostDto, postSchema } from '@/schemas/posts'

const handler = chain(
  method('POST'),
  endpointRequiresAuth(),
  validate(postSchema),
  async (req, res) => {
    const { title, content, description, tags } = req.body as PostDto

    await prismaClient.post.create({
      data: {
        title,
        content,
        description,
        tags,
        authorId: 1,
      },
    })

    res.status(201).json({
      message: 'Post created',
    })
  }
)

export default handler
