import type { SkeletonProps } from './Skeleton.types'

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', style }) => {
  return (
    <div
      role="status"
      aria-label="Đang tải dữ liệu"
      style={style}
      className={`animate-pulse rounded-md bg-neutral-300/40 dark:bg-neutral-700/40 ${className}`}
    >
      <span className="sr-only">Đang tải...</span>
    </div>
  )
}
