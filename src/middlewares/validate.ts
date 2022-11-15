import { NextApiHandler } from 'next'
import { ZodObject, ZodRawShape } from 'zod'
import { Middleware } from '@/middlewares'

export const validate = <T extends ZodRawShape>(
  schema: ZodObject<T>
): Middleware => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (result.success) {
      req.body = result.data
      return next()
    }

    res.status(400).json({
      error: 'Invalid request body',
      details: result.error.issues,
    })
  }
}
