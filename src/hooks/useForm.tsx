import { useState } from 'react'

export default function useForm<State extends Record<string, unknown>>(
  initial: State
) {
  const [form, setForm] = useState(initial)

  const register = <Key extends keyof State>(key: Key) => {
    return {
      value: form[key],
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setForm({
          ...form,
          [key]: event.target.value,
        })
      },
    }
  }

  return {
    form,
    setForm,
    register,
  }
}
