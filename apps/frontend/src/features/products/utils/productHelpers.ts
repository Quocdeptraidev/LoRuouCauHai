import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '../constants/productData'
import type { Product, ProductSpec } from '../types'

/** Gallery ảnh; thiếu thì lặp ảnh chính để demo lightbox */
export const getProductImages = (product: Product): string[] => {
  if (product.images && product.images.length > 0) {
    return product.images
  }
  return [product.image, product.image, product.image]
}

export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find((product) => product.id === id)
}

export const getCategoryName = (categoryId: string): string => {
  return PRODUCT_CATEGORIES.find((item) => item.id === categoryId)?.name ?? categoryId
}

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  const sameCategory = MOCK_PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  )

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }

  const selectedIds = new Set(sameCategory.map((item) => item.id))
  selectedIds.add(product.id)

  const sameBrand = MOCK_PRODUCTS.filter(
    (item) => item.brandText === product.brandText && !selectedIds.has(item.id),
  )

  return [...sameCategory, ...sameBrand].slice(0, limit)
}

export const getProductSpecs = (product: Product): ProductSpec[] => {
  if (product.specs && product.specs.length > 0) {
    return product.specs
  }

  const specs: ProductSpec[] = []
  if (product.capacity) {
    specs.push({ label: 'Thể tích', value: product.capacity })
  }
  if (product.alcoholByVolume) {
    specs.push({ label: 'Nồng độ', value: product.alcoholByVolume })
  }
  specs.push({ label: 'Danh mục', value: getCategoryName(product.category) })
  if (product.brandText) {
    specs.push({ label: 'Thương hiệu', value: product.brandText })
  }
  return specs
}

export const getLongDescription = (product: Product): string => {
  if (product.longDescription) {
    return product.longDescription
  }
  return product.description ?? ''
}

export const formatProductPrice = (price: number): string =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price)
