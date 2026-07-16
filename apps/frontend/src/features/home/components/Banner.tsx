import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Button } from '../../../components/ui'
import type { SlideData } from '../types'

interface BannerProps {
  slides: SlideData[]
}

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const Banner: React.FC<BannerProps> = ({ slides }) => {
  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-xl"
      aria-label="Banners quảng cáo Lò Rượu Cậu Hai"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        style={
          {
            '--swiper-theme-color': '#d97706',
            '--swiper-navigation-color': '#d97706',
            '--swiper-navigation-size': '22px',
          } as React.CSSProperties
        }
        className="h-[320px] sm:h-[420px] md:h-[520px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Ảnh nền */}
            <div className="absolute inset-0 w-full h-full">
              <img src={slide.image} alt="" className="w-full h-full object-cover" loading="lazy" />
              {/* Lớp phủ tối mờ gradient tạo độ sâu và tương phản chữ */}
              <div className="absolute inset-0 bg-linear-to-r from-neutral-950/80 via-neutral-950/45 to-transparent" />
            </div>

            {/* Nội dung chữ */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-6 sm:px-12 md:px-16 text-left text-white space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif text-amber-500 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-md leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="pt-2">
                  <a href={slide.link}>
                    <Button variant="solid" size="md">
                      {slide.buttonText}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
