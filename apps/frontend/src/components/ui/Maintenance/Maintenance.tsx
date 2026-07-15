import type { MaintenanceProps } from './Maintenance.types'

export const Maintenance: React.FC<MaintenanceProps> = ({
  title = 'Hệ Thống Đang Chưng Cất Phiên Bản Mới',
  description = 'Lò Rượu Cậu Hai đang thực hiện bảo trì và nâng cấp định kỳ để nâng cao chất lượng dịch vụ. Chúng tôi sẽ trở lại trong thời gian sớm nhất với những mẻ rượu thơm ngon nhất.',
  hotline = '0987.654.321',
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-radial from-neutral-900 via-neutral-950 to-neutral-950 px-4 text-center text-neutral-100">
      {/* Icon chưng cất/bảo trì hoạt họa */}
      <figure className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-lg shadow-amber-500/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 animate-pulse"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17l-5.1-3.26m0 0a2.032 2.032 0 01-.64-2.77l1.519-2.632a2.032 2.032 0 012.77-.64l5.1 3.26m-8.75 2.77l5.1 3.26m0 0a2.032 2.032 0 002.77-.64l1.519-2.632a2.032 2.032 0 00-.64-2.77l-5.1-3.26"
          />
        </svg>
        {/* Bong bóng trang trí */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
        </span>
      </figure>

      {/* Tiêu đề chính */}
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-amber-500 sm:text-4xl md:text-5xl max-w-2xl leading-tight">
        {title}
      </h1>

      {/* Đoạn mô tả */}
      <p className="max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg">
        {description}
      </p>

      {/* Thông tin liên hệ nhanh */}
      <address className="mt-8 flex flex-col items-center gap-4 sm:flex-row not-italic">
        <a
          href={`tel:${hotline.replace(/\./g, '')}`}
          aria-label={`Gọi hotline ${hotline}`}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-amber-600 px-6 font-semibold text-white transition-all hover:bg-amber-700 active:scale-95 shadow-md shadow-amber-600/20"
        >
          Gọi Hotline: {hotline}
        </a>
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Liên hệ qua Zalo để được hỗ trợ"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 px-6 font-medium text-neutral-300 transition-all hover:bg-neutral-800 hover:text-white active:scale-95"
        >
          Liên hệ Zalo hỗ trợ
        </a>
      </address>

      {/* Chân trang trang trí */}
      <footer className="absolute bottom-6 text-sm text-neutral-600">
        <small>© 2026 Lò Rượu Cậu Hai. All rights reserved.</small>
      </footer>
    </main>
  )
}
