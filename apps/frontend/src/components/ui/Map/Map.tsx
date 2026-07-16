import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api'
import { MapPinOff } from 'lucide-react'
import { Skeleton } from '../Skeleton'
import { DEFAULT_MAP_CENTER, GOOGLE_MAP_URL } from '../../../constants/maps'
import type { MapProps } from './Map.types'

export const Map: React.FC<MapProps> = ({
  center = DEFAULT_MAP_CENTER,
  zoom = 16,
  width = '100%',
  height = '300px',
  markerIconUrl = '/vite.svg',
  ariaLabel = 'Bản đồ vị trí Lò Rượu Cậu Hai',
}) => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || ''

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    id: 'google-map-script',
  })

  const containerStyle = {
    width,
    height,
  }

  if (loadError) {
    return (
      <div
        style={containerStyle}
        className="flex flex-col items-center justify-center bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm p-6 text-center rounded-xl space-y-4"
      >
        <MapPinOff className="h-10 w-10 text-red-500" aria-hidden="true" />
        <div>
          <h3 className="font-semibold text-white">Không thể tải bản đồ</h3>
          <p className="text-xs text-neutral-500 mt-1">
            Bạn vẫn có thể xem vị trí cửa hàng trên Google Maps.
          </p>
        </div>
        <a
          href={GOOGLE_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mở bản đồ vị trí Lò Rượu Cậu Hai trên Google Maps"
          className="inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 active:scale-95 transition-all shadow-md shadow-amber-600/10"
        >
          Mở Google Maps
        </a>
      </div>
    )
  }

  if (!isLoaded) {
    return <Skeleton className="rounded-lg" style={containerStyle} />
  }

  // Cấu hình custom marker icon sử dụng logo
  const markerIcon = markerIconUrl
    ? {
        url: markerIconUrl,
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 20),
      }
    : undefined

  return (
    <div
      style={containerStyle}
      className="rounded-xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"
      role="application"
      aria-label={ariaLabel}
    >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: [
            {
              elementType: 'geometry',
              stylers: [{ color: '#242f3e' }],
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242f3e' }],
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }],
            },
          ],
        }}
      >
        <MarkerF position={center} icon={markerIcon} title="Lò Rượu Cậu Hai" />
      </GoogleMap>
    </div>
  )
}
