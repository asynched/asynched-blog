import { FaGithub } from 'react-icons/fa'

export default function AsideGithubCard() {
  return (
    <div className="relative mb-12 rounded bg-zinc-900 p-8 text-white">
      <h2 className="mb-2 text-2xl font-bold leading-none tracking-tighter">
        Veja o projeto no GitHub!
      </h2>
      <p>Clique aqui para vê-lo.</p>
      <FaGithub className="absolute bottom-8 right-8 h-16 w-16 opacity-25" />
    </div>
  )
}
