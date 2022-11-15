interface IPrevent {
  preventDefault: () => void
}

export const preventDefault = <Event extends IPrevent>(
  fn?: (event: Event) => void
) => {
  return (event: Event) => {
    event.preventDefault()

    if (fn) {
      fn(event)
    }
  }
}

interface IStopPropagation {
  stopPropagation: () => void
}

export const stopPropagation = <Event extends IStopPropagation>(
  fn?: (event: Event) => void
) => {
  return (event: Event) => {
    event.stopPropagation()

    if (fn) {
      fn(event)
    }
  }
}
