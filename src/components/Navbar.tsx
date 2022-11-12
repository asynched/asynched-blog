import {
  BookmarkIcon,
  CommandLineIcon,
  HeartIcon,
  HomeIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <nav
      className="
        px-8
        fixed
        flex
        items-center
        justify-between
        h-16
        w-full
        bottom-0
        bg-white border-t

        lg:sticky
        lg:top-0
        lg:w-16
        lg:flex-col
        lg:h-screen
        lg:p-8
        lg:border-r
        lg:items-center
      "
    >
      <CommandLineIcon className="w-8 h-8" />
      <div className="flex lg:flex-col gap-4 my-auto lg:pb-4 lg:border-b">
        <HomeIcon className="text-zinc-500 w-6 h-6" />
        <BookmarkIcon className="text-zinc-500 w-6 h-6" />
        <HeartIcon className="text-zinc-500 w-6 h-6" />
      </div>
      <div>
        <LinkIcon className="text-zinc-500 w-6 h-6" />
      </div>
    </nav>
  )
}
