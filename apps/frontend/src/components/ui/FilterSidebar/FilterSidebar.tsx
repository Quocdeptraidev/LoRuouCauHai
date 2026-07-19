import React from 'react'

export interface CategoryItem {
  id: string
  name: string
  count: number
}

interface FilterSidebarProps {
  categories: CategoryItem[]
  selectedId: string
  onSelect: (id: string) => void
  className?: string
}

const FilterSidebarComponent: React.FC<FilterSidebarProps> = ({
  categories,
  selectedId,
  onSelect,
  className = '',
}) => {
  return (
    <nav className={`w-full select-none ${className}`} aria-label="Bộ lọc danh mục rượu">
      {/* Danh sách các danh mục xếp hàng ngang, tự động scroll ngang trên mobile */}
      <ul className="flex flex-row flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((category) => {
          const isActive = category.id === selectedId
          return (
            <li key={category.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-(--brand-wine) border-(--brand-wine) text-white shadow-xs'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`text-[10px] font-bold ${
                    isActive ? 'text-white/80' : 'text-neutral-400'
                  }`}
                >
                  ({category.count})
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// Áp dụng Memoization
export const FilterSidebar = React.memo(FilterSidebarComponent)
