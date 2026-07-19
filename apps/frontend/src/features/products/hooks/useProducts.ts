import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../services/productApi'

export const useProducts = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 60 * 1000, // Cache sống trong 1 phút, không fetch lại nếu còn tươi
  })

  return {
    products: data,
    isLoading,
    error: error ? error.message : null,
  }
}
