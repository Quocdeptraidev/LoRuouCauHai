export interface LatLng {
  lat: number
  lng: number
}

export interface MapProps {
  /** Toạ độ trung tâm của bản đồ */
  center?: LatLng
  /** Mức thu phóng mặc định */
  zoom?: number
  /** Chiều rộng của component bản đồ */
  width?: string
  /** Chiều cao của component bản đồ */
  height?: string
  /** URL ảnh logo tuỳ biến để làm marker */
  markerIconUrl?: string
  /** Nhãn aria-label cho bản đồ */
  ariaLabel?: string
}
