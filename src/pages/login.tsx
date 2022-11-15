import { useRouter } from 'next/router'
import { preventDefault } from '@/utils/ui'
import { login } from '@/services/api/auth'
import { set as setCookie } from '@/utils/cookies'
import { JWT_COOKIE_KEY } from '@/config/constants'

export default function Login() {
  const router = useRouter()

  const handleLogin = async () => {
    const form = document.forms[0]!
    const formData = new FormData(form)

    try {
      const data = await login({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      })

      setCookie(JWT_COOKIE_KEY, data.token)
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="grid h-screen w-full place-items-center bg-gray-100 text-zinc-900">
      <div className="rounded bg-white px-8 py-12 shadow-xl">
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tighter text-blue-600">
          Login
        </h1>
        <form onSubmit={preventDefault(handleLogin)} className="grid gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="something@mail.com"
              className="rounded border py-2 px-4 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
              className="rounded border py-2 px-4 outline-none"
            />
          </div>
          <button
            className="
              mt-4
              rounded
            bg-gradient-to-r
            from-sky-500
              to-blue-600
            py-2
              text-white
              transition
              duration-200
              ease-in-out

              hover:shadow-lg
              hover:shadow-sky-200
            "
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
