import { MOCK_PRODUCTS } from '../constants/productData'
import type { Product } from '../types'

export const fetchProducts = async (): Promise<Product[]> => {
  // Giả lập độ trễ mạng 300ms để mô phỏng môi trường mạng thực tế
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS)
    }, 300)
  })
}

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  // Giả lập độ trễ mạng 300ms để mô phỏng môi trường mạng thực tế
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS.find((product) => product.id === id))
    }, 300)
  })
}
