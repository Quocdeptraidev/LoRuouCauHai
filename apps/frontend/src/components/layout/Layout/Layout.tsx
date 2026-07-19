import { Header } from '../Header'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <Header />
      <main className="grow w-full mx-auto px-4 sm:px-4 lg:px-4 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
