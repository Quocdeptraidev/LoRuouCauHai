import React from 'react'
import type { Product } from '../types'
import { ProductCard, ProductCardSkeleton } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  skeletonCount?: number
  emptyMessage?: boolean
}

const ProductGridComponent: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  skeletonCount = 6,
  emptyMessage = true,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 md:gap-8">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    if (!emptyMessage) {
      return null
    }

    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 px-6 py-16 text-center">
        <p className="font-serif text-lg font-bold text-(--text-h)">Không tìm thấy sản phẩm</p>
        <p className="mt-2 text-sm text-neutral-500">
          Thử đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export const ProductGrid = React.memo(ProductGridComponent)
