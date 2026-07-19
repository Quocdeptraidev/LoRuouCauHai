export interface ImageLightboxProps {
  images: string[]
  initialIndex?: number
  alt: string
  isOpen: boolean
  onClose: () => void
  filterStyle?: string
}
