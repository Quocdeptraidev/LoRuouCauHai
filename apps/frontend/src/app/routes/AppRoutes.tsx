import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../../components/layout/Layout/Layout'
import { Skeleton } from '../../components/ui'
import { PATHS } from './paths'

// Lazy load các trang để tối ưu hóa bundle size
const HomePage = lazy(() =>
  import('../../features/home/pages/HomePage').then((module) => ({ default: module.HomePage })),
)
const ProductPage = lazy(() =>
  import('../../features/products/pages/ProductPage').then((module) => ({
    default: module.ProductPage,
  })),
)
const ProductDetailPage = lazy(() =>
  import('../../features/products/pages/ProductDetailPage').then((module) => ({
    default: module.ProductDetailPage,
  })),
)
const NotFoundPage = lazy(() =>
  import('../../features/not-found/pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
)

// Fallback skeleton hiển thị khi đang chuyển trang
const RouteFallback: React.FC = () => (
  <div
    className="mx-auto w-full max-w-7xl space-y-6 py-8 px-4"
    aria-busy="true"
    aria-label="Đang tải trang"
  >
    <Skeleton className="h-8 w-48 bg-neutral-300/40" />
    <Skeleton className="h-4 w-72 bg-neutral-300/40" />
    <Skeleton className="aspect-21/9 w-full rounded-2xl bg-neutral-300/40" />
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <Skeleton className="aspect-4/5 w-full rounded-xl bg-neutral-300/40" />
      <Skeleton className="aspect-4/5 w-full rounded-xl bg-neutral-300/40" />
      <Skeleton className="aspect-4/5 w-full rounded-xl bg-neutral-300/40" />
    </div>
  </div>
)

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Nested Routes sử dụng Layout có Outlet */}
        <Route element={<Layout />}>
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
          <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
