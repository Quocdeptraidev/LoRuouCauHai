import { useState, useEffect } from 'react'
import { fetchHomeBanners } from '../services/homeApi'
import type { SlideData } from '../types'

export const useHomeData = () => {
  const [banners, setBanners] = useState<SlideData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchHomeBanners()
        if (isMounted) {
          setBanners(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi lấy dữ liệu trang chủ.')
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
  }, [])

  return {
    banners,
    isLoading,
    error,
  }
}
