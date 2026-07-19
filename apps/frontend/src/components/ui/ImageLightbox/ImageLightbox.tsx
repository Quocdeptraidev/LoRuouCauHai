import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ImageLightboxProps } from './ImageLightbox.types'

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex = 0,
  alt,
  isOpen,
  onClose,
  filterStyle,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex)

  // Đồng bộ hóa activeIndex khi lightbox được mở hoặc initialIndex thay đổi (React standard pattern)
  if (isOpen !== prevIsOpen || (isOpen && initialIndex !== prevInitialIndex)) {
    setPrevIsOpen(isOpen)
    setPrevInitialIndex(initialIndex)
    setActiveIndex(initialIndex)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % images.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, images.length, onClose])

  if (!isOpen || images.length === 0) {
    return null
  }

  const showNavigation = images.length > 1

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh sản phẩm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng xem ảnh"
        className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {showNavigation && (
        <button
          type="button"
          aria-label="Ảnh trước"
          onClick={(event) => {
            event.stopPropagation()
            setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
          }}
          className="absolute left-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      <div
        className="relative flex max-h-[85vh] w-full max-w-3xl flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={images[activeIndex]}
          alt={`${alt} — ảnh ${activeIndex + 1}`}
          className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-opacity duration-300"
          style={filterStyle ? { filter: filterStyle } : undefined}
        />

        {showNavigation && (
          <p className="text-sm font-medium text-white/80 tabular-nums">
            {activeIndex + 1} / {images.length}
          </p>
        )}
      </div>

      {showNavigation && (
        <button
          type="button"
          aria-label="Ảnh sau"
          onClick={(event) => {
            event.stopPropagation()
            setActiveIndex((prev) => (prev + 1) % images.length)
          }}
          className="absolute right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body,
  )
}
