import {
  BookmarkIcon,
  CommandLineIcon,
  HeartIcon,
  HomeIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav
      className="
        fixed
        bottom-0
        z-50
        flex
        h-16
        w-full
        items-center
        justify-between
        border-t bg-white
        px-8

        lg:sticky
        lg:top-0
        lg:h-screen
        lg:w-20
        lg:flex-col
        lg:items-center
        lg:border-r
        lg:p-8
      "
    >
      <Link href="/">
        <CommandLineIcon className="h-8 w-8" />
      </Link>
      <div className="my-auto flex gap-4 lg:flex-col lg:border-b lg:pb-4">
        <Link href="/">
          <HomeIcon className="h-6 w-6 text-zinc-500" />
        </Link>
        <Link href="/bookmarks">
          <BookmarkIcon className="h-6 w-6 text-zinc-500" />
        </Link>
        <Link href="/likes">
          <HeartIcon className="h-6 w-6 text-zinc-500" />
        </Link>
      </div>
      <a href="https://github.com/asynched" target="_blank">
        <LinkIcon className="h-6 w-6 text-zinc-500" />
      </a>
    </nav>
  )
}
