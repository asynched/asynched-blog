export const safePromise = <T>(promise: Promise<T>): Promise<[T, Error]> => {
  return promise
    .then<[T, Error]>((data) => [data, null as any])
    .catch<[T, Error]>((error) => [null as T, error])
}
