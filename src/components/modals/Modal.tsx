import { stopPropagation } from '@/utils/ui'

export type ModalProps = {
  children: React.ReactNode
  display: boolean
  onClose: () => void
}

export default function Modal({ display, children, onClose }: ModalProps) {
  if (!display) {
    return null
  }

  return (
    <div
      className="
        fixed
        top-0
        right-0
        z-[120]
        grid
        h-screen
        w-full
        place-items-center
        overflow-hidden
        bg-black
        bg-opacity-25
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="max-w-screen-sm rounded bg-white p-8 shadow-xl"
        onClick={stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
