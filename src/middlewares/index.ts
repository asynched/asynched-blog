import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => unknown | Promise<unknown>

export const chain = (...middlewares: Middleware[]): NextApiHandler => {
  return async (req, res) => {
    let next = true
    for (const middleware of middlewares) {
      next = false

      await middleware(req, res, () => {
        next = true
      })

      if (!next) {
        return
      }
    }
  }
}

type Methods = {
  get: Middleware
  post: Middleware
  patch: Middleware
  put: Middleware
  delete: Middleware
}

export const route = (handlers: Partial<Methods>): Middleware => {
  return (req, res, next) => {
    const handler = handlers[req.method!.toLowerCase() as keyof Methods]
    if (handler) {
      handler(req, res, next)
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  }
}

export const method = (
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
): Middleware => {
  return (req, res, next) => {
    if (req.method === method) {
      next()
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  }
}
