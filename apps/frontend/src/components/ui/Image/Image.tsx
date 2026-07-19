import React, { useState } from 'react'
import type { ImageProps } from './Image.types'

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=400&q=80'

export const ImageComponent: React.FC<ImageProps> = ({
  src,
  alt = '',
  fallbackSrc = DEFAULT_FALLBACK,
  aspectRatio = 'aspect-auto',
  wrapperClassName = '',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [prevSrc, setPrevSrc] = useState(src)

  // Điều chỉnh state khi prop src thay đổi (React standard pattern)
  if (src !== prevSrc) {
    setPrevSrc(src)
    setIsLoaded(false)
    setIsError(false)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    if (!isError) {
      setIsError(true)
    }
  }

  const displaySrc = isError ? fallbackSrc : src

  return (
    <div className={`relative overflow-hidden w-full ${aspectRatio} ${wrapperClassName}`}>
      {/* Màu nền giả lập Skeleton trong khi ảnh đang tải */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-neutral-100 dark:bg-neutral-850 animate-pulse"
          role="status"
          aria-label="Đang tải hình ảnh"
        />
      )}

      <img
        src={displaySrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  )
}

// Áp dụng Memoization để tránh re-render thừa
export const Image = React.memo(ImageComponent)
