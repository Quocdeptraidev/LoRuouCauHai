import React from 'react'
import { Card, Skeleton } from '../../../components/ui'
import type { Product } from '../types'
import { Phone, Wine } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      isHoverable
      isGlass
      className="group flex flex-col h-full border-neutral-200/60 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70"
    >
      <figure className="relative aspect-4/5 w-full overflow-hidden bg-linear-to-r from-amber-50/30 to-amber-100/20 dark:from-neutral-950/20 dark:to-neutral-900/10 border-b border-neutral-100 dark:border-neutral-800/60">
        {product.badgeText && (
          <span
            className="absolute top-4 left-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold px-3 py-1 rounded-full text-[10px] sm:text-xs shadow-md shadow-amber-500/10 flex items-center gap-1 z-10 select-none animate-fade-in"
            role="status"
          >
            {product.badgeText}
          </span>
        )}

        {product.brandText && (
          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-serif font-black text-neutral-850 dark:text-neutral-200 tracking-[0.2em] uppercase select-none drop-shadow-sm">
            {product.brandText.split(' ').map((word, index) => {
              if (index === 1) {
                return (
                  <span
                    key={index}
                    className="text-amber-650 dark:text-amber-500 font-medium italic lowercase tracking-normal ml-0.5"
                  >
                    {word}
                  </span>
                )
              }
              return word
            })}
          </span>
        )}

        <img
          src={product.image}
          alt={`Chai rượu ${product.name} đặt cạnh hộp quà cao cấp trên bục tròn`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={product.filterStyle ? { filter: product.filterStyle } : undefined}
          loading="lazy"
        />

        <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-10 flex items-end justify-start">
          {/* Vòng cung bo viền */}
          <div className="w-8 h-8 bg-neutral-900/90 dark:bg-black/90 border-t border-r border-amber-500/30 rounded-tr-2xl shadow-inner relative">
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-500/80 rounded-bl-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10 flex items-end justify-end">
          <div className="w-8 h-8 bg-neutral-900/90 dark:bg-black/90 border-t border-l border-amber-500/30 rounded-tl-2xl shadow-inner relative">
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-500/80 rounded-br-sm"></div>
          </div>
        </div>

        {product.hotline && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-bold px-4 py-1.5 rounded-full text-[10px] sm:text-xs shadow-lg border border-amber-300/40 z-20 whitespace-nowrap flex items-center gap-1.5">
            <Phone className="h-3 w-3 text-neutral-950 fill-neutral-950" />
            <span>Hotline liên hệ:</span>
            <span className="font-extrabold text-neutral-950 tracking-wider">
              {product.hotline}
            </span>
          </div>
        )}
      </figure>

      <div className="p-5 flex flex-col grow text-left">
        <span className="text-[10px] sm:text-xs font-extrabold text-amber-600 dark:text-amber-500 tracking-widest uppercase block mb-1.5 select-none">
          {product.category}
        </span>

        <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300 font-serif leading-snug">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed font-sans font-medium">
            {product.description}
          </p>
        )}

        {(product.capacity || product.alcoholByVolume) && (
          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800/85 text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400 select-none">
            {product.capacity && (
              <span className="flex items-center gap-1">
                <Wine className="h-3 w-3 text-amber-500" />
                Thể tích:{' '}
                <strong className="text-neutral-800 dark:text-neutral-200">
                  {product.capacity}
                </strong>
              </span>
            )}
            {product.alcoholByVolume && (
              <span className="flex items-center gap-1">
                <span className="text-amber-500 font-bold">%</span>
                Nồng độ:{' '}
                <strong className="text-neutral-800 dark:text-neutral-200">
                  {product.alcoholByVolume}
                </strong>
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card className="flex flex-col h-full border-neutral-200/60 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70 overflow-hidden">
      {/* Khối Media / Header Skeleton */}
      <div className="relative aspect-4/5 w-full bg-neutral-100 dark:bg-neutral-850">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Khối Content Skeleton */}
      <div className="p-5 flex flex-col grow space-y-4 text-left">
        {/* Category Skeleton */}
        <Skeleton className="h-3 w-1/4 rounded bg-neutral-300/40 dark:bg-neutral-700/40" />

        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded bg-neutral-300/40 dark:bg-neutral-700/45" />
          <Skeleton className="h-5 w-1/2 rounded bg-neutral-300/40 dark:bg-neutral-700/45" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-1.5 pt-2">
          <Skeleton className="h-3.5 w-full rounded bg-neutral-300/40 dark:bg-neutral-700/40" />
          <Skeleton className="h-3.5 w-5/6 rounded bg-neutral-300/40 dark:bg-neutral-700/40" />
        </div>

        {/* Specs Skeleton */}
        <div className="flex gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 mt-auto">
          <Skeleton className="h-3.5 w-1/3 rounded bg-neutral-300/40 dark:bg-neutral-700/40" />
          <Skeleton className="h-3.5 w-1/3 rounded bg-neutral-300/40 dark:bg-neutral-700/40" />
        </div>
      </div>
    </Card>
  )
}
