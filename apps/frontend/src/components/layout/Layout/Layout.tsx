import { Header } from '../Header'
import { Footer } from '../Footer'
import type { LayoutProps } from './Layout.types'

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-55 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <Header />
      <main className="grow w-full mx-auto px-4 sm:px-4 lg:px-4 py-4">{children}</main>
      <Footer />
    </div>
  )
}
