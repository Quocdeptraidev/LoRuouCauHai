import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Nhãn hiển thị phía trên ô nhập liệu */
  label?: string
  /** Thông báo lỗi validation hiển thị phía dưới */
  error?: string
}
