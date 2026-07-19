import { useMemo, useState, useCallback } from 'react'
import { FilterSidebar, Pagination, SearchInput, Skeleton } from '../../../components/ui'
import { ALL_CATEGORY_ID, PRODUCT_CATEGORIES, PRODUCT_PAGE_SIZE } from '../constants/productData'
import type { CategoryItem } from '../types'
import { ProductGrid } from '../components/ProductGrid'
import { useProducts } from '../hooks/useProducts'

export const ProductPage: React.FC = () => {
  const { products, isLoading, error } = useProducts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORY_ID)
  const [page, setPage] = useState(1)

  // Đếm số lượng sản phẩm theo từng danh mục
  const categories: CategoryItem[] = useMemo(() => {
    return PRODUCT_CATEGORIES.map((item) => ({
      id: item.id,
      name: item.name,
      count:
        item.id === ALL_CATEGORY_ID
          ? products.length
          : products.filter((product) => product.category === item.id).length,
    }))
  }, [products])

  // Lọc sản phẩm theo danh mục và từ khóa tìm kiếm (Sử dụng useMemo để ghi nhớ tính toán)
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchCategory = category === ALL_CATEGORY_ID || product.category === category
      const matchSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description?.toLowerCase().includes(normalizedSearch)

      return matchCategory && matchSearch
    })
  }, [products, search, category])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCT_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  // Cắt sản phẩm theo trang hiện tại (Sử dụng useMemo)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCT_PAGE_SIZE
    return filteredProducts.slice(start, start + PRODUCT_PAGE_SIZE)
  }, [filteredProducts, currentPage])

  // useCallback để giữ nguyên tham chiếu hàm, giúp React.memo ở component con hoạt động hiệu quả
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleCategorySelect = useCallback((id: string) => {
    setCategory(id)
    setPage(1)
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 py-6 px-4 sm:px-6 lg:px-8">
      {/* Tiêu đề trang */}
      <header className="space-y-2 text-center sm:text-left select-none">
        <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase">
          Danh mục sản phẩm
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-(--text-h) sm:text-4xl">
          Sản phẩm Lò Rượu Cậu Hai
        </h1>
        <p className="max-w-2xl text-sm text-neutral-500 sm:text-base">
          Khám phá tinh hoa rượu quê hương qua các dòng rượu chưng cất hạ thổ bình sứ Bát Tràng trứ
          danh.
        </p>
      </header>

      {/* Thanh tìm kiếm trên cùng full width */}
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        placeholder="Tìm tên hoặc mô tả sản phẩm..."
      />

      {/* Bộ lọc danh mục dạng thanh ngang tối giản */}
      <FilterSidebar
        categories={categories}
        selectedId={category}
        onSelect={handleCategorySelect}
      />

      {/* Số kết quả tìm thấy, Lưới sản phẩm & Phân trang */}
      <div className="w-full space-y-6">
        {/* Hiển thị số lượng kết quả phù hợp */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2 select-none">
          {isLoading ? (
            <Skeleton className="h-4 w-32 bg-neutral-300/40" />
          ) : (
            <p className="text-xs sm:text-sm text-neutral-500 font-sans font-medium">
              Có{' '}
              <strong className="font-semibold text-(--text-h)">{filteredProducts.length}</strong>{' '}
              sản phẩm phù hợp
            </p>
          )}
        </div>

        {/* Lưới sản phẩm */}
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="font-serif text-lg font-bold text-red-800">Không thể tải sản phẩm</p>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        ) : (
          <ProductGrid products={paginatedProducts} isLoading={isLoading} />
        )}

        {/* Phân trang */}
        {!isLoading && !error && filteredProducts.length > PRODUCT_PAGE_SIZE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
