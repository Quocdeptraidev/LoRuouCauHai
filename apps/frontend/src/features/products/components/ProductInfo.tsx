import { Link } from 'react-router-dom'
import { Phone, Wine } from 'lucide-react'
import { Skeleton } from '../../../components/ui'
import { ROUTES } from '../../../constants/routes'
import type { Product } from '../types'
import {
  formatProductPrice,
  getCategoryName,
  getLongDescription,
  getProductSpecs,
} from '../utils/productHelpers'

interface ProductInfoProps {
  product?: Product | null
  isLoading?: boolean
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, isLoading = false }) => {
  if (isLoading || !product) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-4/5" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-28 w-full" />
        <div className="flex gap-3">
          <Skeleton className="h-11 w-36" />
          <Skeleton className="h-11 w-36" />
        </div>
      </div>
    )
  }

  const specs = getProductSpecs(product)
  const description = getLongDescription(product)
  const zaloLink = product.hotline
    ? `https://zalo.me/${product.hotline.replace(/\s/g, '')}`
    : 'https://zalo.me'

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-3">
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-amber-300/50 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-brand-wine-dark"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-xs font-bold tracking-[0.16em] text-amber-600 uppercase">
          {getCategoryName(product.category)}
          {product.badgeText ? ` · ${product.badgeText}` : ''}
        </p>

        <h1 className="font-serif text-3xl leading-tight font-bold tracking-tight text-(--text-h) sm:text-4xl">
          {product.name}
        </h1>

        <p className="font-serif text-2xl font-bold text-brand-wine">
          {formatProductPrice(product.price)}
        </p>
      </div>

      {(product.capacity || product.alcoholByVolume) && (
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-neutral-600">
          {product.capacity && (
            <span className="inline-flex items-center gap-1.5">
              <Wine className="h-4 w-4 text-amber-500" aria-hidden="true" />
              Thể tích: <strong className="text-(--text-h)">{product.capacity}</strong>
            </span>
          )}
          {product.alcoholByVolume && (
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-amber-500" aria-hidden="true">
                %
              </span>
              Nồng độ: <strong className="text-(--text-h)">{product.alcoholByVolume}</strong>
            </span>
          )}
        </div>
      )}

      {description && (
        <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">{description}</p>
      )}

      {specs.length > 0 && (
        <dl className="divide-y divide-neutral-100 border-y border-neutral-100">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline justify-between gap-4 py-3 text-sm"
            >
              <dt className="text-neutral-500">{spec.label}</dt>
              <dd className="text-right font-semibold text-(--text-h)">{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-wine px-6 text-sm font-bold text-white shadow-md shadow-brand-wine/20 transition-colors hover:bg-brand-wine-hover"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {product.hotline ? `Zalo ${product.hotline}` : 'Liên hệ Zalo'}
        </a>

        <Link
          to={ROUTES.PRODUCTS}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 px-6 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100/50"
        >
          Về danh sách
        </Link>
      </div>
    </div>
  )
}
