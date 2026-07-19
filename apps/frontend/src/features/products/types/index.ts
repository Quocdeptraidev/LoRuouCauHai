export type ProductTag = string

export interface ProductSpec {
  label: string
  value: string
}

export interface CategoryItem {
  id: string
  name: string
  count: number
}

export interface Product {
  id: string
  name: string
  category: string
  image: string
  images?: string[]
  badgeText?: string
  brandText?: string
  hotline?: string
  description?: string
  longDescription?: string
  capacity?: string
  alcoholByVolume?: string
  filterStyle?: string
  tags?: string[]
  price: number
  priceText: string
  specs?: ProductSpec[]
}
