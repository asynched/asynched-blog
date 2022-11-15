import Navbar from '@/components/Navbar'
import Truthy from '@/components/utils/Truthy'
import Head from 'next/head'

type BaseLayoutProps = {
  title: string | string[]
  children: React.ReactNode
  aside: React.ReactNode
  heading?: React.ReactNode
}

export default function BaseLayout({
  aside,
  children,
  title,
  heading,
}: BaseLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="relative mx-auto flex max-w-screen-2xl text-zinc-900 ">
        <Navbar />
        <main className="flex-1">
          <Truthy cond={!!heading}>
            {() => <header className="border-b px-8 py-4">{heading}</header>}
          </Truthy>
          <div className="relative mx-auto max-w-3xl p-8">{children}</div>
        </main>
        <aside
          className="
          sticky
          top-0
          hidden
          h-screen
          border-l
          p-8

          xl:block
          xl:w-96
        "
        >
          {aside}
        </aside>
      </div>
    </>
  )
}
