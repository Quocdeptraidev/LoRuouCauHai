# Chuẩn Lập Trình Dự Án (Coding Standards) - Lò Rượu Cậu Hai

Tài liệu này định nghĩa các quy tắc lập trình, quy cách đặt tên, cấu trúc source code và tiêu chuẩn bảo mật cho cả Backend (BE) và Frontend (FE). Tất cả các lập trình viên và AI Agent khi tham gia phát triển dự án này **phải đọc và tuân thủ nghiêm ngặt**.

---

## I. Nguyên Tắc Chung (General Rules)

1.  **Ngôn Ngữ:**
    *   Đặt tên biến, hàm, class, file, cơ sở dữ liệu: Luôn sử dụng **tiếng Anh**.
    *   Viết log, commit message: Ưu tiên sử dụng **tiếng Anh** hoặc **tiếng Việt không dấu** (chuẩn hóa).
    *   Comment giải thích code (nếu cần): Sử dụng **tiếng Việt** rõ nghĩa, súc tích để giải thích các logic nghiệp vụ phức tạp.
2.  **Đảm Bảo Chất Lượng Code:**
    *   Không được tắt tính năng kiểm tra kiểu (type checking) của TypeScript hoặc MyPy trừ trường hợp bất khả kháng (phải có comment giải thích rõ lý do).
    *   Tất cả code trước khi commit phải đi qua Git Hooks (`pre-commit` để lint & format tự động, và `pre-push` để build test).

---

## II. Quy Tắc Đối Với Backend (Python / FastAPI)

### 1. Kiến Trúc Phân Lớp (Layered Architecture)
Mã nguồn Backend bắt buộc tuân theo luồng xử lý:
```text
Router ──► Service ──► Repository ──► Database
```
*   **Routers (`app/api/`):**
    *   Chỉ làm nhiệm vụ tiếp nhận request, validate dữ liệu đầu vào bằng Pydantic Schemas, gọi Service xử lý và trả về Response.
    *   **Không** viết logic nghiệp vụ (business logic) hay truy vấn SQL trực tiếp tại đây.
    *   Sử dụng Dependency Injection của FastAPI để truyền session database hoặc user hiện tại.
*   **Services (`app/services/`):**
    *   Là nơi xử lý toàn bộ logic nghiệp vụ (tính toán đơn hàng, xử lý nghiệp vụ nấu rượu, tích hợp AI).
    *   Không được viết trực tiếp các câu lệnh SQL mà phải thông qua Repository.
*   **Repositories (`app/repositories/`):**
    *   Chỉ làm nhiệm vụ thực thi các câu lệnh CRUD với database sử dụng SQLAlchemy 2.0 (bắt buộc dùng cú pháp bất đồng bộ `async/await`).
    *   Không chứa logic nghiệp vụ.

### 2. Module Generative AI (`app/ai/`)
*   Toàn bộ logic tương tác với LLM, embeddings và Vector DB phải được tách riêng thành các module nhỏ trong `app/ai/`.
*   Các prompt (prompt templates) bắt buộc quản lý tập trung trong file `app/ai/prompt.py` hoặc các file markdown trong thư mục `prompts/`, không được viết cứng (hardcode) prompt trực tiếp trong file code xử lý.

### 3. Quy Cách Đặt Tên (Python Naming Conventions)
*   **Class:** PascalCase (ví dụ: `UserRepository`).
*   **Hàm & Biến:** snake_case (ví dụ: `get_user_by_id`, `product_list`).
*   **Hằng số:** UPPER_CASE (ví dụ: `MAX_RETRIES`).
*   **Database Models:** PascalCase cho class, snake_case cho tên bảng (ví dụ: `class ProductModel`, `__tablename__ = "products"`).

---

## III. Quy Tắc Đối Với Frontend (React / TypeScript / Vite)

### 1. Cấu Trúc Thư Mục & Component
*   Đặt tên tệp Component bằng **PascalCase** và có đuôi `.tsx` (ví dụ: `ProductCard.tsx`, `CartDrawer.tsx`).
*   Đặt tên file hooks, helpers bằng **camelCase** (ví dụ: `useCart.ts`, `formatCurrency.ts`).
*   Mỗi Component nên được tách riêng ra một file và đặt trong thư mục `src/components/` (nếu dùng chung) hoặc thư mục local của trang đó.

### 2. Quản Lý Giao Diện (Styling)
*   Sử dụng **Tailwind CSS v4** để viết nhanh giao diện.
*   Màu sắc chủ đạo, font chữ và các biến cấu hình giao diện chung phải sử dụng hệ thống CSS Variables được định nghĩa tại `:root` trong [index.css](file:///d:/LoRuouCauHai/apps/frontend/src/index.css) để dễ dàng hỗ trợ giao diện sáng/tối (Light/Dark mode).

### 3. Quản Lý Trạng Thái (State Management)
*   **Local State:** Sử dụng `useState` của React cho các trạng thái chỉ ảnh hưởng nội bộ component (ví dụ: đóng mở dropdown, nội dung ô input đang nhập).
*   **Global State (Giỏ hàng, User, AI Session):** Sử dụng **Zustand**. Định nghĩa store trong thư mục `src/store/` (ví dụ: `src/store/useCartStore.ts`).

### 4. Giao Tiếp API (API Fetching)
*   Sử dụng **React Query** (`@tanstack/react-query`) để thực hiện các thao tác Fetch, Mutate dữ liệu giúp tự động quản lý cache, loading state, error state và đồng bộ dữ liệu thời gian thực.

### 5. Nguyên Tắc TypeScript Nghiêm Ngặt (Strict TypeScript)
*   **CẤM TUYỆT ĐỐI sử dụng `any`:** Không được phép khai báo kiểu `any` dưới mọi hình thức để tránh làm mất đi tác dụng của TypeScript. Mọi dữ liệu (Props, State, API Response, Event, Callback...) phải được định nghĩa kiểu (`interface` hoặc `type`) cụ thể.
*   Trường hợp dữ liệu động không thể xác định trước kiểu, sử dụng kiểu `unknown` và thực hiện Type Narrowing (sử dụng `typeof`, `instanceof` hoặc Type Guards) để đảm bảo an toàn trước khi sử dụng.
*   Khai báo tường minh kiểu trả về của các custom hooks, helper functions và component props.

