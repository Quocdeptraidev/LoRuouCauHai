import type { InputProps } from './Input.types'

const BASE_STYLES =
  'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 px-4 h-11 text-neutral-800 dark:text-neutral-200 placeholder-neutral-450 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all'

const ERROR_STYLES = 'border-red-500 focus:ring-red-500/30 focus:border-red-500'

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-neutral-700 dark:text-neutral-350"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${BASE_STYLES} ${error ? ERROR_STYLES : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  )
}
