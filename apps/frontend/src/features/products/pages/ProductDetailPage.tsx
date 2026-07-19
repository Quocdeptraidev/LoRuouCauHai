import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ROUTES } from '../../../constants/routes'
import { ProductGallery } from '../components/ProductGallery'
import { ProductInfo } from '../components/ProductInfo'
import { RelatedProducts } from '../components/RelatedProducts'
import { useProductDetail } from '../hooks/useProductDetail'
import { getProductImages } from '../utils/productHelpers'

export const ProductDetailPage: React.FC = () => {
  const { productId, product, relatedProducts, isLoading, error, notFound } = useProductDetail()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId])

  if (!isLoading && notFound) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <p className="font-serif text-2xl font-bold text-(--text-h)">Không tìm thấy sản phẩm</p>
        <p className="max-w-md text-sm text-neutral-500">
          Sản phẩm bạn đang tìm có thể đã được đổi tên hoặc không còn trong danh mục.
        </p>
        <Link
          to={ROUTES.PRODUCTS}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-brand-wine px-6 text-sm font-bold text-white hover:bg-brand-wine-hover"
        >
          Về danh sách sản phẩm
        </Link>
      </div>
    )
  }

  if (!isLoading && error) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <p className="font-serif text-2xl font-bold text-red-800">Không thể tải sản phẩm</p>
        <p className="max-w-md text-sm text-red-600">{error}</p>
        <Link
          to={ROUTES.PRODUCTS}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 px-6 text-sm font-bold text-neutral-700 hover:bg-neutral-50"
        >
          Về danh sách sản phẩm
        </Link>
      </div>
    )
  }

  const images = product ? getProductImages(product) : []

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 py-4 sm:py-6">
      <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to={ROUTES.HOME} className="transition-colors hover:text-brand-wine">
              Trang chủ
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link to={ROUTES.PRODUCTS} className="transition-colors hover:text-brand-wine">
              Sản phẩm
            </Link>
          </li>
          {(product || isLoading) && (
            <>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="max-w-[14rem] truncate font-medium text-(--text-h) sm:max-w-md">
                {isLoading ? 'Đang tải...' : product?.name}
              </li>
            </>
          )}
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          images={images}
          alt={product ? `Chai rượu ${product.name}` : 'Ảnh sản phẩm'}
          filterStyle={product?.filterStyle}
          isLoading={isLoading}
        />
        <ProductInfo product={product} isLoading={isLoading} />
      </div>

      <RelatedProducts products={relatedProducts} isLoading={isLoading} />
    </div>
  )
}
