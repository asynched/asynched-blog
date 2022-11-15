import { GetServerSideProps, NextApiHandler } from 'next'
import { verify } from 'jsonwebtoken'
import { JWT_COOKIE_KEY } from '@/config/constants'
import { parse } from '@/utils/cookies'
import { Middleware } from '.'

export const pageRequiresAuth = (
  fn?: GetServerSideProps
): GetServerSideProps => {
  return async (ctx) => {
    if (!ctx.req.headers.cookie) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    const cookies = parse(ctx.req.headers.cookie!)

    if (!cookies[JWT_COOKIE_KEY]) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    try {
      verify(cookies[JWT_COOKIE_KEY], process.env.JWT_SECRET_KEY!)
    } catch (error) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    if (fn) {
      return fn(ctx)
    }

    return {
      props: {},
    }
  }
}

export const endpointRequiresAuth = (): Middleware => (req, res, next) => {
  if (!req.headers.cookie) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  const cookies = parse(req.headers.cookie!)

  if (!cookies[JWT_COOKIE_KEY]) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  try {
    verify(cookies[JWT_COOKIE_KEY], process.env.JWT_SECRET_KEY!)
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  next()
}
