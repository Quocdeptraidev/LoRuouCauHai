import { useState } from 'react'
import { Expand, ImageIcon } from 'lucide-react'
import { ImageLightbox, Skeleton } from '../../../components/ui'

interface ProductGalleryProps {
  images: string[]
  alt: string
  filterStyle?: string
  isLoading?: boolean
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  alt,
  filterStyle,
  isLoading = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="aspect-4/5 w-full rounded-2xl" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-20 shrink-0 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="flex aspect-4/5 items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400">
        <ImageIcon className="h-10 w-10" aria-hidden="true" />
      </div>
    )
  }

  const safeIndex = Math.min(activeIndex, images.length - 1)

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="group relative block w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-linear-to-br from-amber-50/40 to-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
          aria-label="Xem ảnh lớn"
        >
          <img
            key={safeIndex}
            src={images[safeIndex]}
            alt={alt}
            className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={filterStyle ? { filter: filterStyle } : undefined}
          />
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-neutral-950/70 px-3 py-1.5 text-xs font-semibold text-white opacity-90 transition-opacity group-hover:opacity-100">
            <Expand className="h-3.5 w-3.5" aria-hidden="true" />
            Xem ảnh
          </span>
        </button>

        {images.length > 1 && (
          <ul className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => {
              const isActive = index === safeIndex

              return (
                <li key={`${image}-${index}`} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Chọn ảnh ${index + 1}`}
                    aria-pressed={isActive}
                    className={`overflow-hidden rounded-xl border-2 transition-all ${
                      isActive
                        ? 'border-brand-wine shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-20 w-20 object-cover"
                      style={filterStyle ? { filter: filterStyle } : undefined}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <ImageLightbox
        images={images}
        initialIndex={safeIndex}
        alt={alt}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        filterStyle={filterStyle}
      />
    </>
  )
}
