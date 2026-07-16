import React from 'react'
import { Map } from '../../ui'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-brand-wine-dark/10 dark:border-black/20 bg-brand-wine dark:bg-brand-wine-dark text-white/80 dark:text-white/70 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-8">
        {/* Cột 1: Giới thiệu thương hiệu */}
        <section aria-labelledby="footer-brand">
          <h2 id="footer-brand" className="text-lg font-bold text-white font-serif">
            Lò Rượu Cậu Hai
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 dark:text-white/70">
            Chuyên chưng cất và cung cấp các dòng rượu nếp truyền thống ngâm ủ hạ thổ. Đảm bảo chất
            lượng tinh khiết, êm nồng và chuẩn vị rượu quê hương.
          </p>
          <address className="mt-3 text-xs text-white/60 dark:text-white/50 not-italic">
            Địa chỉ sản xuất: Thôn Trung, Xã Tiên Tân, Thành phố Phủ Lý, Hà Nam
          </address>

          <div className="mt-4 w-full md:w-[400px]">
            <Map height="220px" />
          </div>
        </section>

        {/* Cột 2: Đường dẫn nhanh */}
        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="text-sm font-bold text-white">
            Khám Phá
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Danh sách rượu
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Quy trình ngâm ủ
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Liên hệ hỗ trợ
              </a>
            </li>
          </ul>
        </nav>

        {/* Cột 3: Liên hệ */}
        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" className="text-sm font-bold text-white">
            Liên Hệ
          </h2>
          <address className="mt-3 flex flex-col gap-2 text-sm not-italic">
            <span>
              Hotline:{' '}
              <a href="tel:0987654321" className="text-white/80 hover:text-white transition-colors">
                0987.654.321
              </a>
            </span>
            <span>
              Email:{' '}
              <a
                href="mailto:hotro@loruoucauhai.vn"
                className="text-white/80 hover:text-white transition-colors"
              >
                hotro@loruoucauhai.vn
              </a>
            </span>
            <span>
              Thời gian làm việc: <time>8:00</time> - <time>22:00</time>
            </span>
          </address>
        </section>
      </div>

      {/* Bản quyền */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/50">
        <small>
          © 2026 Lò Rượu Cậu Hai. Sản phẩm truyền thống chưng cất thủ công. Vui lòng thưởng thức có
          trách nhiệm.
        </small>
      </div>
    </footer>
  )
}
