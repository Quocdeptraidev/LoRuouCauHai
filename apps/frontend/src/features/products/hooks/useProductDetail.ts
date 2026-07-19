import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../services/productApi'
import type { Product } from '../types'
import { getRelatedProducts } from '../utils/productHelpers'

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      if (!productId) {
        if (isMounted) {
          setProduct(null)
          setRelatedProducts([])
          setNotFound(true)
          setIsLoading(false)
        }
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        setNotFound(false)

        const data = await fetchProductById(productId)

        if (!isMounted) {
          return
        }

        if (!data) {
          setProduct(null)
          setRelatedProducts([])
          setNotFound(true)
          return
        }

        setProduct(data)
        setRelatedProducts(getRelatedProducts(data))
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải chi tiết sản phẩm.')
          setProduct(null)
          setRelatedProducts([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [productId])

  return {
    productId,
    product,
    relatedProducts,
    isLoading,
    error,
    notFound,
  }
}
