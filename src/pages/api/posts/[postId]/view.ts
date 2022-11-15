import { chain, method } from '@/middlewares'
import { prismaClient } from '@/shared/prisma'

const handler = chain(method('GET'), async (req, res) => {
  const postId = req.query.postId as string

  const post = await prismaClient.post.findFirst({
    where: {
      id: postId,
    },
  })

  if (!post) {
    return res.status(404).json({
      message: "The post you were trying to view wasn't found",
    })
  }

  await prismaClient.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  })

  return res.status(200).json({
    message: 'Successfully updated the views',
  })
})
