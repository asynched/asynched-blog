import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function AsideSearchForm() {
  return (
    <form className="mb-12 flex items-center gap-4 rounded-full border px-4">
      <MagnifyingGlassIcon className="h-4 w-4" />
      <input
        type="text"
        className="py-2 text-sm outline-none"
        placeholder="Pesquise aqui..."
      />
    </form>
  )
}
