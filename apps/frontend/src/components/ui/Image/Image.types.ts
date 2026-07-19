import type React from 'react'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  aspectRatio?: string
  wrapperClassName?: string
}
