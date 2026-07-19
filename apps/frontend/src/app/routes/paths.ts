export const PATHS = {
  HOME: '/',
  PRODUCTS: '/san-pham',
  PRODUCT_DETAIL: '/san-pham/:productId',
  NOT_FOUND: '*',
} as const

export type AppRoute = (typeof PATHS)[keyof typeof PATHS]

/** Tạo path chi tiết sản phẩm từ id */
export const productDetailPath = (productId: string): string => `/san-pham/${productId}`
