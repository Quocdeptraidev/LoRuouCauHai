import type { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Bật hiệu ứng nâng lên khi hover */
  isHoverable?: boolean
  /** Bật hiệu ứng kính mờ (glassmorphism) */
  isGlass?: boolean
}
