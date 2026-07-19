import React from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchInputComponent: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Tìm tên sản phẩm...',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={`relative w-full text-left ${className}`}>
      {/* Icon kính lúp bên trái */}
      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400">
        <Search className="h-5 w-5" />
      </span>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-full border border-neutral-300 bg-white pl-12 pr-4 h-12 text-sm text-(--text-h) placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm"
      />
    </div>
  )
}

// Áp dụng Memoization để tránh re-render không cần thiết
export const SearchInput = React.memo(SearchInputComponent)
