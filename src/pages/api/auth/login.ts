import { sign } from 'jsonwebtoken'
import { chain, method } from '@/middlewares'
import { z } from 'zod'
import { validate } from '@/middlewares/validate'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginDto = z.infer<typeof loginSchema>

const handler = chain(
  method('POST'),
  validate(loginSchema),
  async (req, res) => {
    const { email, password } = req.body as LoginDto

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: 'Invalid credentials',
      })
    }

    return res.json({
      token: sign({ email }, process.env.JWT_SECRET_KEY!, {
        expiresIn: '1d',
      }),
    })
  }
)

export default handler
