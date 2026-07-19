import { Link } from 'react-router-dom'
import { PATHS } from '../../../app/routes'

/** Minh họa tạm: người thợ nấu rượu cạnh bình sứ 404 (SVG inline) */
const NotFoundIllustration: React.FC = () => (
  <svg
    viewBox="0 0 320 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto h-auto w-full max-w-sm"
    role="img"
    aria-label="Người thợ đang nấu rượu cạnh bình sứ ghi số 404"
  >
    {/* Bóng đổ chung */}
    <ellipse cx="160" cy="200" rx="110" ry="10" fill="#C4A484" opacity="0.35" />

    {/* --- Người thợ (trái) --- */}
    {/* Đầu */}
    <circle cx="78" cy="58" r="22" fill="#E8C4A8" />
    {/* Tóc / khăn */}
    <path
      d="M56 55c2-16 14-26 28-24 8 1 14 6 17 13-6-2-12-2-18 0-8 2-14 8-17 16-4-1-8-3-10-5z"
      fill="#5C3D2E"
    />
    {/* Thân áo */}
    <path
      d="M48 88c8-10 28-14 44-8l6 8v52H50l-2-52z"
      fill="#F5E6D3"
      stroke="#8B5E3C"
      strokeWidth="1.5"
    />
    {/* Quần */}
    <path d="M52 140h42v42c-6 4-14 6-22 4-8-1-14-4-20-8v-38z" fill="#6B4423" />
    {/* Tay cầm muỗng */}
    <path d="M92 100c18 4 28 18 30 34" stroke="#E8C4A8" strokeWidth="10" strokeLinecap="round" />
    {/* Muỗng khuấy */}
    <line
      x1="118"
      y1="128"
      x2="132"
      y2="158"
      stroke="#8B5E3C"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <ellipse cx="136" cy="164" rx="10" ry="6" fill="#A67C52" />

    {/* Nồi nấu nhỏ */}
    <ellipse cx="118" cy="168" rx="28" ry="8" fill="#8B5E3C" />
    <path d="M92 168v-18c0-6 10-10 26-10s26 4 26 10v18" fill="#A67C52" />
    {/* Hơi nước */}
    <path
      d="M108 138c2-6 0-10 2-14M118 136c2-7 1-12 3-16M128 138c1-5-1-9 1-13"
      stroke="#D3822B"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />

    {/* --- Bình rượu (phải) --- */}
    {/* Nắp */}
    <rect x="198" y="42" width="64" height="12" rx="3" fill="#70202F" />
    <rect x="206" y="54" width="48" height="10" rx="2" fill="#8F1F33" />
    {/* Thân bình */}
    <path
      d="M214 64h32c4 0 8 4 10 12l14 88c2 12-8 22-22 22h-36c-14 0-24-10-22-22l14-88c2-8 6-12 10-12z"
      fill="#A67C52"
    />
    {/* Highlight thân */}
    <path
      d="M220 78c-2 20-4 50-2 80"
      stroke="#C4A484"
      strokeWidth="6"
      strokeLinecap="round"
      opacity="0.35"
    />
    {/* Số 404 */}
    <text
      x="230"
      y="148"
      textAnchor="middle"
      fill="#FDF6EC"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="28"
      fontWeight="700"
    >
      404
    </text>
    {/* Sparkles */}
    <circle cx="278" cy="88" r="3.5" fill="#D3822B" />
    <circle cx="288" cy="108" r="2.5" fill="#E8A94B" />
    <circle cx="274" cy="118" r="2" fill="#D3822B" />
  </svg>
)

export const NotFoundPage: React.FC = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-14 text-center sm:py-20">
      <figure className="mb-8 sm:mb-10">
        <NotFoundIllustration />
      </figure>

      <h1 className="max-w-xl font-serif text-3xl leading-snug font-bold tracking-tight text-[#4A2C2A] sm:text-4xl">
        Bình rượu này chưa được ủ ở đây
      </h1>

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#6B4E4A] sm:text-base">
        Có vẻ bạn đã đi lạc vào một con hẻm chưa có rượu. Chum rượu này không tồn tại hoặc đã được
        đổi chỗ.
      </p>

      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
        <Link
          to={PATHS.HOME}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[#D3822B] px-8 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c27422]"
        >
          Về trang chủ
        </Link>
        <Link
          to={PATHS.PRODUCTS}
          className="inline-flex h-12 items-center justify-center rounded-xl border border-[#70202F] bg-transparent px-8 text-sm font-semibold text-[#70202F] transition-colors hover:bg-[#70202F]/[0.06]"
        >
          Xem sản phẩm
        </Link>
      </div>
    </div>
  )
}
