import type { Product } from '../types'

export const INFORMATION_CONTENT = {
  badgeText: 'Tinh hoa Rượu truyền thống Việt Nam',
  title: 'Lò Rượu Cậu Hai Chưng Cất Hạ Thổ',
  description:
    'Sự giao thoa hoàn mỹ giữa công thức chưng cất thủ công truyền thống lâu đời và quy trình ngâm ủ hạ thổ khắt khe. Gìn giữ trọn vẹn hương vị êm đằm, nồng nàn mà sang trọng trong từng giọt rượu quê hương.',
  primaryBtnText: 'Nhận tư vấn ngay',
  secondaryBtnText: 'Khám phá sản phẩm',
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ruou-nep-cam',
    name: 'Rượu Gạo Nếp Cẩm - Bình sứ Bát Tràng',
    category: 'CỬU LONG MỸ TỬU',
    image: '/products/hoang_hoa_tuu.png',
    badgeText: '🔥 Bán chạy',
    brandText: 'somo gold',
    hotline: '0902 931 119',
    description:
      'Chưng cất tỉ mỉ từ gạo nếp cẩm Tây Bắc tuyển chọn tuyển lọc, vị ngọt êm đằm thắm tinh tế đặc trưng.',
    capacity: '500ml',
    alcoholByVolume: '32% vol',
    filterStyle: '', // Giữ nguyên màu gốc (xanh cobalt)
  },
  {
    id: 'ruou-mo',
    name: 'Rượu Mơ Hương Tích - Bình sứ Bát Tràng',
    category: 'CỬU LONG MỸ TỬU',
    image: '/products/hoang_hoa_tuu.png',
    badgeText: '✨ Ưa thích',
    brandText: 'somo gold',
    hotline: '0902 931 119',
    description:
      'Ngâm ủ tự nhiên từ trái mơ vàng Chùa Hương chín mọng, vị chua ngọt hài hoà êm nhẹ cuốn hút.',
    capacity: '500ml',
    alcoholByVolume: '19% vol',
    filterStyle: 'hue-rotate(145deg) saturate(1.4) brightness(0.95)', // Xoay sang tông màu vàng mơ hổ phách
  },
  {
    id: 'ruou-dao',
    name: 'Rượu Đào Tiên Sơn - Bình sứ Bát Tràng',
    category: 'CỬU LONG MỸ TỬU',
    image: '/products/hoang_hoa_tuu.png',
    badgeText: '🆕 Mới nhất',
    brandText: 'somo gold',
    hotline: '0902 931 119',
    description:
      'Chiết xuất từ đào chín đỏ Mẫu Sơn lừng danh thơm nức, sắc rượu óng ánh sang trọng đầy say đắm.',
    capacity: '500ml',
    alcoholByVolume: '25% vol',
    filterStyle: 'hue-rotate(200deg) saturate(1.2) brightness(0.9)', // Xoay sang màu hồng đỏ đào
  },
]
