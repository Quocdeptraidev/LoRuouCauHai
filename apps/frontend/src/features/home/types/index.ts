export interface SlideData {
  id: number
  image: string
  title: string
  subtitle: string
  buttonText: string
  link: string
}

export interface Product {
  id: string
  name: string
  category: string
  image: string
  badgeText?: string
  brandText?: string
  hotline?: string
  description?: string
  capacity?: string
  alcoholByVolume?: string
  filterStyle?: string
}
