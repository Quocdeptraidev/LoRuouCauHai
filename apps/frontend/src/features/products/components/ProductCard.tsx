import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Skeleton, Image } from '../../../components/ui'
import { productDetailPath } from '../../../app/routes/paths'
import type { Product } from '../types'
import { Wine } from 'lucide-react'
import { formatProductPrice } from '../utils/productHelpers'

interface ProductCardProps {
  product: Product
}

const ProductCardComponent: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={productDetailPath(product.id)}
      className="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2"
      aria-label={`Xem chi tiết ${product.name}`}
    >
      <Card
        isGlass={false}
        className="group flex h-full flex-col border-neutral-200/60 bg-white transition-shadow hover:shadow-md"
      >
        <figure className="relative w-full overflow-hidden border-b border-neutral-100 bg-linear-to-r from-amber-50/30 to-amber-100/20">
          {product.brandText && (
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-neutral-850 uppercase drop-shadow-sm z-10 select-none sm:text-sm font-serif font-black">
              {product.brandText.split(' ').map((word, index) => {
                if (index === 1) {
                  return (
                    <span
                      key={index}
                      className="ml-0.5 font-medium tracking-normal text-amber-650 italic lowercase"
                    >
                      {word}
                    </span>
                  )
                }
                return word
              })}
            </span>
          )}

          {/* Sử dụng component Image dùng chung tối ưu hóa */}
          <Image
            src={product.image}
            alt={`Chai rượu ${product.name} đặt cạnh hộp quà cao cấp trên bục tròn`}
            aspectRatio="aspect-4/5"
            className="transition-transform duration-700 ease-out group-hover:scale-105"
            style={product.filterStyle ? { filter: product.filterStyle } : undefined}
          />
        </figure>

        <div className="flex grow flex-col gap-2 p-4 text-left">
          {/* Tên sản phẩm */}
          <h3 className="text-base leading-snug font-bold text-(--text-h) font-serif">
            {product.name}
          </h3>

          {/* Mô tả ngắn */}
          {product.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed font-medium text-(--text) font-sans">
              {product.description}
            </p>
          )}

          {/* Hiển thị tags đặc tính dạng tích xanh lá cây giống hệt ảnh mẫu */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-col gap-1 mt-1 text-xs text-emerald-600 font-semibold font-sans select-none">
              {product.tags.map((tag) => (
                <div key={tag} className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold" aria-hidden="true">
                    ✓
                  </span>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Giá sản phẩm */}
          <p className="mt-2 text-base font-bold text-brand-wine font-serif">
            {formatProductPrice(product.price)}
          </p>

          {/* Spec: Dung tích và Nồng độ */}
          {(product.capacity || product.alcoholByVolume) && (
            <div className="mt-auto flex items-center gap-4 border-t border-neutral-100 pt-2 text-[11px] font-semibold text-(--text) select-none font-sans">
              {product.capacity && (
                <span className="flex items-center gap-1">
                  <Wine className="h-3 w-3 text-amber-500" />
                  Thể tích: <strong className="text-(--text-h)">{product.capacity}</strong>
                </span>
              )}
              {product.alcoholByVolume && (
                <span className="flex items-center gap-1">
                  <span className="font-bold text-amber-500">%</span>
                  Nồng độ: <strong className="text-(--text-h)">{product.alcoholByVolume}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}

// Áp dụng Memoization
export const ProductCard = React.memo(ProductCardComponent)

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card
      isGlass={false}
      className="flex h-full flex-col overflow-hidden border-neutral-200/60 bg-white"
    >
      <div className="relative aspect-4/5 w-full bg-neutral-100">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="flex grow flex-col space-y-4 p-5 text-left">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded bg-neutral-300/40" />
          <Skeleton className="h-5 w-1/2 rounded bg-neutral-300/40" />
        </div>

        <div className="space-y-1.5 pt-2">
          <Skeleton className="h-3.5 w-full rounded bg-neutral-300/40" />
          <Skeleton className="h-3.5 w-5/6 rounded bg-neutral-300/40" />
        </div>

        <div className="mt-auto flex gap-4 border-t border-neutral-100 pt-4">
          <Skeleton className="h-3.5 w-1/3 rounded bg-neutral-300/40" />
          <Skeleton className="h-3.5 w-1/3 rounded bg-neutral-300/40" />
        </div>
      </div>
    </Card>
  )
}
