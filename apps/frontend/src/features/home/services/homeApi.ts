import type { SlideData } from '../types'

const MOCK_SLIDES: SlideData[] = [
  {
    id: 1,
    image: '/banners/traditional.png',
    title: 'Tinh Hoa Rượu Việt',
    subtitle: 'Nếp cái hoa vàng hạ thổ chưng cất thủ công chuẩn vị truyền thống.',
    buttonText: 'Khám phá sản phẩm',
    link: '#products',
  },
  {
    id: 2,
    image: '/banners/modern.png',
    title: 'Ủ Ấm Tình Thân',
    subtitle: 'Hương vị êm nồng, tinh khiết, gắn kết mọi cuộc vui sum vầy.',
    buttonText: 'Nhận tư vấn ngay',
    link: '#contact',
  },
]

export const fetchHomeBanners = async (): Promise<SlideData[]> => {
  // Giả lập độ trễ mạng 800ms
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SLIDES)
    }, 800)
  })
}
