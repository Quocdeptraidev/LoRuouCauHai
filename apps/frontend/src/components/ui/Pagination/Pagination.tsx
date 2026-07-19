import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  // Không hiển thị phân trang nếu chỉ có 1 trang
  if (totalPages <= 1) return null

  // Tạo mảng số trang (ví dụ [1, 2, 3])
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      className={`flex items-center justify-center gap-1.5 mt-8 sm:mt-12 select-none ${className}`}
      aria-label="Phân trang danh sách sản phẩm"
    >
      {/* Nút Trang trước */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center justify-center h-10 w-10 rounded-xl border border-neutral-200 bg-white text-(--text) hover:bg-neutral-50 hover:text-(--text-h) transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        aria-label="Trang trước"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Danh sách các số trang */}
      {pages.map((page) => {
        const isActive = page === currentPage
        return (
          <button
            key={page}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center h-10 w-10 rounded-xl text-sm font-bold transition-all active:scale-95 ${
              isActive
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10'
                : 'border border-neutral-200 bg-white text-(--text) hover:bg-neutral-50 hover:text-(--text-h)'
            }`}
          >
            {page}
          </button>
        )
      })}

      {/* Nút Trang sau */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center h-10 w-10 rounded-xl border border-neutral-200 bg-white text-(--text) hover:bg-neutral-50 hover:text-(--text-h) transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        aria-label="Trang sau"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  )
}

// Áp dụng Memoization
export const Pagination = React.memo(PaginationComponent)
