type LoginDto = {
  email: string
  password: string
}

type LoginToken = {
  token: string
}

export const login = async (data: LoginDto): Promise<LoginToken> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to login')
  }

  return response.json()
}
