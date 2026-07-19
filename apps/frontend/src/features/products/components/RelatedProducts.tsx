import type { Product } from '../types'
import { ProductGrid } from './ProductGrid'

interface RelatedProductsProps {
  products: Product[]
  isLoading?: boolean
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  isLoading = false,
}) => {
  if (!isLoading && products.length === 0) {
    return null
  }

  return (
    <section
      className="space-y-6 border-t border-neutral-200/80 pt-10"
      aria-labelledby="related-products-heading"
    >
      <div className="space-y-2 text-center sm:text-left">
        <p className="text-xs font-bold tracking-[0.16em] text-amber-600 uppercase">Gợi ý thêm</p>
        <h2
          id="related-products-heading"
          className="font-serif text-2xl font-bold text-(--text-h) sm:text-3xl"
        >
          Sản phẩm liên quan
        </h2>
      </div>

      <ProductGrid
        products={products}
        isLoading={isLoading}
        skeletonCount={4}
        emptyMessage={false}
      />
    </section>
  )
}
