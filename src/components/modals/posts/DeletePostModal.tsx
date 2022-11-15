import Modal, { ModalProps } from '@/components/modals/Modal'

type DeletePostModalProps = Pick<ModalProps, 'display' | 'onClose'> & {
  onDelete: () => unknown
}

export default function DeletePostModal({
  display,
  onClose,
  onDelete,
}: DeletePostModalProps) {
  return (
    <Modal display={display} onClose={onClose}>
      <h1 className="mb-2 text-center text-4xl font-bold tracking-tighter">
        Apagar
      </h1>
      <p className="mb-8 text-zinc-600">
        Você irá deletar o post atual, deseja confirmar?
      </p>
      <div className="grid gap-4">
        <button
          className="border py-2 text-zinc-600 transition ease-in-out hover:bg-zinc-100"
          onClick={onClose}
        >
          Não, mantenha o post.
        </button>
        <button
          onClick={onDelete}
          className="border  border-red-600 py-2 text-red-600 transition ease-in-out hover:bg-red-600 hover:text-white"
        >
          Desejo apagar.
        </button>
      </div>
    </Modal>
  )
}
