import { useEffect, useState } from 'react'

export const useStorage = <T extends Record<string, unknown>>(
  key: string,
  initial: T
) => {
  const [storage, _setStorage] = useState<T>(() => {
    if ('localStorage' in globalThis) {
      const raw = localStorage.getItem(key)

      if (raw) {
        return JSON.parse(raw) as T
      }

      return initial
    }

    return initial
  })

  const setStorage = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
    _setStorage(value)
  }

  const mergeStorage = (value: Partial<T>) => {
    const updated = {
      ...storage,
      ...value,
    }

    setStorage(updated as T)
  }

  useEffect(() => {
    const raw = localStorage.getItem(key)

    if (raw) {
      _setStorage(JSON.parse(raw) as T)
    }
  }, [key, _setStorage])

  return {
    storage,
    setStorage,
    mergeStorage,
  }
}
