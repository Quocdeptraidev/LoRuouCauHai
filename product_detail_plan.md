# Master Plan — Trang Chi Tiết Sản Phẩm (`/san-pham/:productId`)

Tài liệu này định nghĩa kế hoạch xây dựng trang chi tiết sản phẩm: layout 2 cột (ảnh | thông tin), xem ảnh có preview/lightbox, và khối sản phẩm liên quan. Triển khai trên mock data hiện có, tái dùng `ProductCard` / `ProductGrid`, tuân thủ `ai-coding-standards.md`.

---

## 0. Mục Tiêu & Phạm Vi

### Mục tiêu UX
1. Click sản phẩm (từ `/san-pham` hoặc trang chủ) → vào trang chi tiết.
2. **Cột trái:** gallery ảnh sản phẩm (ảnh lớn + thumbnail).
3. **Cột phải:** thông tin chi tiết (tên, giá, tags, dung tích, nồng độ, mô tả, CTA liên hệ).
4. Click ảnh → **preview fullscreen** (lightbox), có thể chuyển ảnh bằng mũi tên / thumbnail.
5. Cuối trang: **Sản phẩm liên quan** (cùng danh mục, loại trừ sản phẩm hiện tại).

### Ngoài phạm vi (phase sau)
- API thật / React Query
- Giỏ hàng / đặt hàng online
- Zoom kính lúp chi tiết pixel (có thể bổ sung sau nếu cần)
- SEO meta động nâng cao

---

## 1. Routing & Điều Hướng

| Path | Page | Ghi chú |
|------|------|---------|
| `/san-pham` | `ProductPage` | Danh sách (đã có) |
| `/san-pham/:productId` | `ProductDetailPage` | Chi tiết mới |

### Cập nhật `App.tsx`
```tsx
<Route path="/san-pham" element={<ProductPage />} />
<Route path="/san-pham/:productId" element={<ProductDetailPage />} />
```

### Điều hướng vào detail
- Bọc `ProductCard` bằng `<Link to={`/san-pham/${product.id}`}>` **hoặc** thêm prop `href` / `onClick`.
- Ưu tiên: card cả khối clickable qua `Link` (accessible, mở tab được).
- Breadcrumb trên detail: `Trang chủ / Sản phẩm / {tên sản phẩm}`.

### 404 sản phẩm
- Nếu `productId` không tồn tại trong mock → UI empty state + nút về `/san-pham`.

---

## 2. Mở Rộng Model Dữ Liệu

Cập nhật `features/products/types/index.ts`:

```ts
export interface Product {
  // ... các field hiện có
  /** Gallery ảnh; nếu thiếu thì fallback [image] */
  images?: string[]
  /** Mô tả dài cho trang detail */
  longDescription?: string
  /** Thông số kỹ thuật / quy trình (tuỳ chọn) */
  specs?: ProductSpec[]
}

export interface ProductSpec {
  label: string
  value: string
}
```

Cập nhật `constants/productData.ts`:
- Mỗi sản phẩm có `images` (2–4 URL). Tạm thời có thể reuse cùng file ảnh + `filterStyle` khác nhau nếu chưa có asset thật.
- Thêm `longDescription` + `specs` cho vài sản phẩm đại diện (đủ để demo UI).

Helper:
- `getProductById(id: string): Product | undefined`
- `getRelatedProducts(product: Product, limit = 4): Product[]` — cùng `category`, exclude `id`, fallback random cùng brand nếu thiếu.

---

## 3. Cấu Trúc File & Thư Mục

### UI dùng chung (có thể tái dùng ngoài products)
| File | Vai trò |
|------|---------|
| `components/ui/ImageLightbox/ImageLightbox.tsx` | Overlay fullscreen xem ảnh, prev/next, đóng Esc / click nền |
| `components/ui/Breadcrumb/Breadcrumb.tsx` | Breadcrumb đơn giản (optional, hoặc inline trong page) |

Export qua `components/ui/index.ts`.

### Feature products
| File | Vai trò |
|------|---------|
| `pages/ProductDetailPage.tsx` | Trang chi tiết: load theo `:productId`, layout, related |
| `components/ProductGallery.tsx` | Cột trái: ảnh chính + thumbnail; mở lightbox |
| `components/ProductInfo.tsx` | Cột phải: tên, giá, tags, specs, mô tả, CTA |
| `components/RelatedProducts.tsx` | Section “Sản phẩm liên quan” + `ProductGrid` |
| `hooks/useProductDetail.ts` | Fetch mock theo id + `isLoading` / `error` |
| `services/productApi.ts` | Thêm `fetchProductById(id)` (delay giả lập như list) |
| `utils/productHelpers.ts` | `getRelatedProducts`, `getProductImages` |

Giữ `ProductCard` / `ProductGrid` — không nhân đôi card.

---

## 4. Thiết Kế Layout Chi Tiết

### Desktop (≥ md)
```text
┌─────────────────────────────────────────────────────────┐
│ Breadcrumb                                               │
├────────────────────────────┬────────────────────────────┤
│                            │ Tên, tags, giá             │
│   [ Ảnh chính lớn ]        │ Dung tích / nồng độ        │
│                            │ Mô tả dài                  │
│   [thumb][thumb][thumb]    │ Specs (nếu có)             │
│                            │ [Liên hệ Zalo] [Về DS]     │
└────────────────────────────┴────────────────────────────┘
│ Sản phẩm liên quan                                       │
│ [Card] [Card] [Card] [Card]                              │
└─────────────────────────────────────────────────────────┘
```

### Mobile
- Ảnh full width phía trên → thông tin bên dưới → related phía dưới.
- Thumbnail cuộn ngang.

### Nguyên tắc UI (bám brand hiện tại)
- Không nhồi card thừa ở hero detail; gallery + text trực tiếp trên nền trang.
- Màu: `brand-wine` + `amber` (đồng bộ list page).
- Typography: tên sản phẩm `font-serif`; body `font-sans`.
- Motion nhẹ: fade ảnh khi đổi thumbnail; lightbox fade-in (2–3 motion có chủ đích).

---

## 5. Chi Tiết Component

### A. `ProductGallery`
**Props:**
```ts
interface ProductGalleryProps {
  images: string[]
  alt: string
  filterStyle?: string
}
```
**Hành vi:**
- State `activeIndex`.
- Click ảnh chính hoặc nút phóng to → mở `ImageLightbox`.
- Thumbnail đổi `activeIndex`; active có viền `amber` / `brand-wine`.
- Skeleton khi parent đang loading.

### B. `ImageLightbox` (common UI)
**Props:**
```ts
interface ImageLightboxProps {
  images: string[]
  initialIndex: number
  alt: string
  isOpen: boolean
  onClose: () => void
  filterStyle?: string
}
```
**Hành vi:**
- Portal / fixed inset-0, nền tối mờ.
- Ảnh lớn giữa; nút Prev / Next; counter `2 / 4`.
- Đóng: nút X, click backdrop, phím `Escape`.
- Phím `←` `→` chuyển ảnh.
- `aria-modal`, trap focus cơ bản.
- Body scroll lock khi mở.

### C. `ProductInfo`
**Props:** `product: Product`
**Nội dung:**
- Tags + badge
- Tên (h1)
- Giá format `vi-VN`
- Meta: capacity, ABV, category label (map id → tên danh mục từ `PRODUCT_CATEGORIES`)
- `longDescription` hoặc fallback `description`
- Bảng `specs` (label / value) nếu có
- CTA: Liên hệ Zalo (hotline / link Zalo), nút secondary về `/san-pham`

### D. `RelatedProducts`
- Heading: “Sản phẩm liên quan”
- Dùng `ProductGrid` với tối đa 4 item
- Ẩn cả section nếu không có related

### E. `useProductDetail`
```ts
// pattern giống useProducts
const { productId } = useParams()
// fetchProductById(productId) → product | null, isLoading, error
```

---

## 6. Cập Nhật `ProductCard`

- Bọc nội dung card bằng:
  ```tsx
  <Link to={`/san-pham/${product.id}`} className="... focus styles">
  ```
- Giữ hover scale ảnh như hiện tại.
- Đảm bảo không lồng thẻ `<a>` (hotline overlay trên card list: nếu còn hotline absolute, cân nhắc bỏ trên list hoặc đổi thành `<span>` vì cả card đã là link).

---

## 7. Loading & Empty States

| Trạng thái | UI |
|------------|----|
| Loading | Skeleton 2 cột (gallery + text lines) + optional related skeletons |
| Không tìm thấy | “Không tìm thấy sản phẩm” + Link về `/san-pham` |
| Error fetch | Message lỗi giống ProductPage |

Delay mock `fetchProductById`: ~500–800ms (đồng bộ trải nghiệm list).

---

## 8. Thứ Tự Triển Khai (Implementation Order)

1. **Data:** mở rộng `Product` type + `images` / `longDescription` / `specs` trong mock; helpers `getProductById`, `getRelatedProducts`, `getProductImages`.
2. **API/Hook:** `fetchProductById` + `useProductDetail`.
3. **UI:** `ImageLightbox` → `ProductGallery` → `ProductInfo`.
4. **Page:** `ProductDetailPage` + route trong `App.tsx`.
5. **Card link:** cập nhật `ProductCard` → navigate detail.
6. **Related:** `RelatedProducts` gắn cuối page.
7. **Verify:** lint/build + checklist thủ công bên dưới.

---

## 9. Kế Hoạch Xác Minh

### Tự động
```bash
npm run lint:frontend
npm run build:frontend
```

### Thủ công
- [ ] Từ `/san-pham` click card → đúng `/san-pham/{id}` và đúng sản phẩm.
- [ ] Từ trang chủ click card featured → vào đúng detail.
- [ ] Desktop: cột trái ảnh, cột phải thông tin.
- [ ] Mobile: ảnh trên, thông tin dưới, không vỡ layout.
- [ ] Đổi thumbnail → ảnh chính đổi.
- [ ] Click ảnh → lightbox; Prev/Next; Esc / backdrop đóng.
- [ ] Sản phẩm liên quan cùng category, không gồm chính nó; click sang detail khác.
- [ ] URL sai id → empty state + về danh sách.
- [ ] Skeleton hiện khi đang load detail.

---

## 10. Rủi Ro & Quyết Định Đã Chốt

| Hạng mục | Quyết định |
|----------|------------|
| URL | `/san-pham/:productId` (dùng `id` slug sẵn có, vd. `ruou-nep-cam`) |
| Asset ảnh | Tạm reuse `hoang_hoa_tuu.png` + biến thể; cấu trúc `images[]` sẵn cho asset thật |
| Hotline trên card list | Ưu tiên cả card là 1 `Link`; bỏ/đổi overlay hotline nếu xung đột nested link |
| Lightbox | Common UI riêng, không phụ thuộc thư viện nặng (tự viết bằng React + Tailwind) |
| State gallery | Local `useState` trong gallery/lightbox; không cần Zustand |

---

## 11. Tiêu Chí Done

- Route detail hoạt động, card list/home navigate đúng.
- Layout 2 cột (desktop) + gallery có preview lightbox.
- Related products hiển thị đúng logic.
- Loading skeleton + 404 id xử lý rõ.
- Lint/build pass; không dùng `any`; đặt tên tiếng Anh, comment nghiệp vụ tiếng Việt nếu cần.
