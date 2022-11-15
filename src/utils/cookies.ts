type Primitive = string | number | boolean | null | undefined

type CookieOptions = {
  path?: string
  domain?: string
  expires?: Date
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export const parse = (cookie: string) => {
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((aggregate, [key, value]) => {
      aggregate[decodeURIComponent(key.trim())] = decodeURIComponent(
        value.trim()
      )
      return aggregate
    }, {} as Record<string, string>)
}
export const set = (
  key: string,
  value: Primitive,
  options?: Partial<CookieOptions>
) => {
  const cookie = `${key}=${value}`
  const path = options?.path ? `;path=${options.path}` : ''
  const domain = options?.domain ? `;domain=${options.domain}` : ''
  const expires = options?.expires
    ? `;expires=${options.expires.toUTCString()}`
    : ''
  const secure = options?.secure ? ';secure' : ''
  const sameSite = options?.sameSite ? `;samesite=${options.sameSite}` : ''
  document.cookie = `${cookie}${path}${domain}${expires}${secure}${sameSite}`
}

export const get = (key: string) => {
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((cookie) => cookie.startsWith(key))
  if (cookie) {
    return cookie.split('=')[1]
  }
  return undefined
}

export const remove = (key: string) => {
  set(key, '', { expires: new Date(0) })
}
