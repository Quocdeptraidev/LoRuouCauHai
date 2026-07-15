import type { CardProps } from './Card.types'

const BASE_STYLES = 'rounded-xl border transition-all duration-300 overflow-hidden'

const GLASS_ON =
  'bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border-neutral-200/50 dark:border-neutral-850/50'
const GLASS_OFF = 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'

const HOVER_ON =
  'hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/30 dark:hover:border-amber-500/20'
const HOVER_OFF = 'shadow-sm shadow-neutral-100/50 dark:shadow-none'

export const Card: React.FC<CardProps> = ({
  children,
  isHoverable = false,
  isGlass = true,
  className = '',
  ...props
}) => {
  const glassStyles = isGlass ? GLASS_ON : GLASS_OFF
  const hoverStyles = isHoverable ? HOVER_ON : HOVER_OFF

  return (
    <article className={`${BASE_STYLES} ${glassStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </article>
  )
}
