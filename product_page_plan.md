Refactor cấu trúc React + Vite project theo hướng scalable và maintainable.

Yêu cầu:

1. Tạo thư mục `src/app`.
2. Di chuyển `App.tsx` vào `src/app/App.tsx`.
3. Tạo thư mục `src/routes`.
4. Tách toàn bộ cấu hình React Router ra khỏi `App.tsx` và chuyển sang `src/routes/index.tsx`.
5. `App.tsx` chỉ có nhiệm vụ render `AppRoutes`.

Ví dụ:

```tsx
function App() {
  return <AppRoutes />
}

export default App
```

6. Nếu `BrowserRouter` đang nằm trong `App.tsx` thì chuyển sang `main.tsx`.

Ví dụ:

```tsx
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
```

7. Tạo file `src/routes/paths.ts` để quản lý route constants.

Ví dụ:

```ts
export const PATHS = {
  HOME: '/',
  PRODUCTS: '/san-pham',
}
```

8. Cập nhật toàn bộ import/export liên quan sau khi di chuyển file.
9. Không thay đổi logic hiện tại của ứng dụng.
10. Giữ nguyên TypeScript typings.
11. Sử dụng React Router v6+ best practices.
12. Nếu có Layout thì sử dụng `<Outlet />` thay vì bọc `<Layout>` bên ngoài `<Routes>`.
13. Sau khi refactor, hiển thị:

- Cấu trúc thư mục mới.
- Nội dung các file đã thay đổi.
- Danh sách các import cần cập nhật.
- Giải thích ngắn gọn lý do của từng thay đổi.

Mục tiêu cuối cùng:

```text
src/
├── app/
│   └── App.tsx
│
├── routes/
│   ├── index.tsx
│   └── paths.ts
│
├── layouts/
├── pages/
├── components/
├── features/
│
└── main.tsx
```

Ưu tiên clean architecture, dễ mở rộng cho:

- Authentication
- Protected Routes
- Admin Dashboard
- Lazy Loading Routes
- Feature-based architecture trong tương lai.
