import React from 'react'
import { ProductCard, ProductCardSkeleton } from '../../products'
import { HOME_FEATURED_PRODUCTS } from '../constants/contents'
import { Sparkles } from 'lucide-react'

interface ProductListProps {
  isLoading?: boolean
}

export const ProductList: React.FC<ProductListProps> = ({ isLoading = false }) => {
  return (
    <section
      className="w-full py-6 sm:py-8 border-t border-neutral-100 dark:border-neutral-800/40"
      aria-labelledby="home-products-heading"
    >
      <div className=" mx-auto px-4 sm:px-6">
        {/* Tiêu đề & mô tả của vùng sản phẩm */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-amber-500 tracking-[0.2em] uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/10">
            <Sparkles className="h-3 w-3" />
            <span>Danh mục đặc sản</span>
          </div>
          <h2
            id="home-products-heading"
            className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-serif tracking-tight"
          >
            Sản Phẩm <span className="text-amber-500">Chưng Cất</span> Thượng Hạng
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            Tuyển chọn những dòng rượu tinh túy nhất từ Lò Rượu Cậu Hai. Mỗi sản phẩm là sự kết hợp
            hoàn mỹ giữa phương pháp hạ thổ truyền thống và nghệ thuật gốm sứ Bát Tràng.
          </p>
        </div>

        {/* Lưới sản phẩm (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => <ProductCardSkeleton key={idx} />)
            : HOME_FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  )
}
