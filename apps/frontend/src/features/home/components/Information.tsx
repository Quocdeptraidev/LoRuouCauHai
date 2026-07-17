import React from 'react'
import { Button } from '../../../components/ui'
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react'
import { INFORMATION_CONTENT } from '../constants/contents'

interface InformationProps {
  badgeText?: string
  title?: string
  description?: string
  primaryBtnText?: string
  secondaryBtnText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export const Information: React.FC<InformationProps> = ({
  badgeText = INFORMATION_CONTENT.badgeText,
  title = INFORMATION_CONTENT.title,
  description = INFORMATION_CONTENT.description,
  primaryBtnText = INFORMATION_CONTENT.primaryBtnText,
  secondaryBtnText = INFORMATION_CONTENT.secondaryBtnText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <article className="flex flex-col items-center text-center space-y-6 max-w-2xl py-6 sm:py-10 mx-auto">
      {/* Badge điểm nhấn */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm font-semibold text-amber-500 shadow-sm shadow-amber-500/5 select-none animate-fade-in">
        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
        <span>{badgeText}</span>
      </div>

      {/* Tiêu đề chính */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif text-neutral-900 dark:text-white leading-tight">
        {title.split(' ').map((word, index) => {
          // Tô màu vàng hổ phách cho chữ "Cậu Hai" hoặc "Hạ Thổ"
          if (word === 'Cậu' || word === 'Hai' || word === 'Hạ' || word === 'Thổ') {
            return (
              <span key={index} className="text-amber-500">
                {word}{' '}
              </span>
            )
          }
          return word + ' '
        })}
      </h1>

      {/* Đoạn mô tả chi tiết */}
      <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans font-medium">
        {description}
      </p>

      {/* Hàng nút bấm kêu gọi hành động */}
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-4 justify-center">
        {/* Nút Tư vấn */}
        <Button
          variant="solid"
          size="lg"
          onClick={onPrimaryClick}
          className="w-full sm:w-auto gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{primaryBtnText}</span>
        </Button>

        {/* Nút Khám phá */}
        <Button
          variant="outline"
          size="lg"
          onClick={onSecondaryClick}
          className="w-full sm:w-auto gap-2 border-amber-500/30 dark:border-amber-500/20 hover:border-amber-500 text-neutral-800 dark:text-amber-500 hover:bg-amber-500/5 dark:hover:bg-amber-500/10 font-bold"
        >
          <span>{secondaryBtnText}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  )
}
