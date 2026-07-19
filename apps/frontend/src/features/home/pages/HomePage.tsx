import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Banner } from '../components/Banner'
import { Information } from '../components/Information'
import { ProductList } from '../components/ProductList'
import { Skeleton } from '../../../components/ui'
import { PATHS } from '../../../app/routes'
import { useHomeData } from '../hooks/useHomeData'

export const HomePage: React.FC = () => {
  const { banners, isLoading, error } = useHomeData()
  const navigate = useNavigate()

  return (
    <div className="space-y-16">
      {/* Khối Banner: Chiếm 100% chiều rộng */}
      <section className="w-full pt-2">
        {isLoading ? (
          <Skeleton className="w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl" />
        ) : error ? (
          <div className="w-full h-[320px] sm:h-[420px] md:h-[480px] flex flex-col items-center justify-center bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm p-6 text-center rounded-2xl">
            <p className="font-semibold text-white">Không thể tải slide giới thiệu</p>
            <p className="text-xs text-neutral-500 mt-1">{error}</p>
          </div>
        ) : (
          <Banner slides={banners} />
        )}
      </section>

      {/* Khối Information: Căn giữa */}
      <section className="w-full">
        <Information
          onPrimaryClick={() => window.open('https://zalo.me', '_blank')}
          onSecondaryClick={() => navigate(PATHS.PRODUCTS)}
        />
      </section>

      {/* Danh sách sản phẩm chưng cất */}
      <ProductList />
    </div>
  )
}
