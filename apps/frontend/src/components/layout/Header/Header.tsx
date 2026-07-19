import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { PATHS } from '../../../app/routes/paths'
import { fetchProducts } from '../../../features/products/services/productApi'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Tải ngầm dữ liệu sản phẩm khi người dùng hover vào menu
  const handlePrefetchProducts = () => {
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
      staleTime: 60 * 1000, // Cache sống trong 1 phút
    })
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-brand-wine-dark/10 dark:border-black/20 bg-brand-wine/95 dark:bg-brand-wine-dark/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'h-13 rounded-b-none shadow-lg'
          : 'h-16 rounded-b-2xl md:rounded-b-3xl shadow-md'
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Lò Rượu */}
        <Link
          to={PATHS.HOME}
          className="flex items-center gap-2"
          aria-label="Trang chủ Lò Rượu Cậu Hai"
        >
          <span className="text-2xl text-amber-500" aria-hidden="true">
            🍶
          </span>
          <span className="text-xl font-bold tracking-tight text-white font-serif">
            Lò Rượu Cậu Hai
          </span>
        </Link>

        {/* Menu điều hướng */}
        <nav aria-label="Menu chính">
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link
                to={PATHS.HOME}
                className="text-sm font-semibold text-white/85 dark:text-white/85 hover:text-white transition-colors"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to={PATHS.PRODUCTS}
                onMouseEnter={handlePrefetchProducts}
                onFocus={handlePrefetchProducts}
                className="text-sm font-semibold text-white/85 dark:text-white/85 hover:text-white transition-colors"
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="text-sm font-semibold text-white/85 dark:text-white/85 hover:text-white transition-colors"
              >
                Quy trình hạ thổ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm font-semibold text-white/85 dark:text-white/85 hover:text-white transition-colors"
              >
                Liên hệ
              </a>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Nút tư vấn Zalo */}
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Liên hệ tư vấn qua Zalo"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-white hover:bg-neutral-100 px-5 text-sm font-bold text-brand-wine transition-all active:scale-95 shadow-md shadow-black/10"
          >
            Liên hệ Zalo
          </a>
        </div>
      </div>
    </header>
  )
}
