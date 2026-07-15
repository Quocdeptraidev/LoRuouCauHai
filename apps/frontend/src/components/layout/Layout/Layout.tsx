import { Header } from '../Header'
import { Footer } from '../Footer'
import type { LayoutProps } from './Layout.types'

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-55 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <Header />
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <Footer />
    </div>
  )
}
