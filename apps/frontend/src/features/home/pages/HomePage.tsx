import React from 'react'
import { Banner } from '../components/Banner'
import { Information } from '../components/Information'
import { Skeleton } from '../../../components/ui'
import { useHomeData } from '../hooks/useHomeData'

export const HomePage: React.FC = () => {
  const { banners, isLoading, error } = useHomeData()

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
          onSecondaryClick={() => {
            const element = document.getElementById('home-intro-heading')
            element?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </section>

      {/* Phần giới thiệu nội dung Lò Rượu */}
      {/* <section className="text-center py-12" aria-labelledby="home-intro-heading">
        <h2 id="home-intro-heading" className="text-3xl font-extrabold text-amber-500 font-serif">
          Hương Vị Rượu Quê Truyền Thống
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-neutral-400 leading-relaxed text-sm sm:text-base">
          Mỗi giọt rượu Cậu Hai đều trải qua quá trình chưng cất tỉ mỉ từ gạo nếp cái hoa vàng hạt
          tròn mẩy, kết hợp với men thuốc bắc 36 vị gia truyền và ngâm hạ thổ đủ ngày đủ tháng.
        </p>
      </section> */}
    </div>
  )
}
