export const noop = () => {}

export const chain = (...fns: (() => void | Promise<void>)[]) => {
  return () => {
    fns.forEach((fn) => fn())
  }
}
