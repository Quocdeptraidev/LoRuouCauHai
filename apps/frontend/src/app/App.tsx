import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from './routes'

// Khởi tạo QueryClient quản lý cache dữ liệu toàn cục
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Tắt tự động tải lại khi đổi tab
      retry: 1, // Thử lại tối đa 1 lần nếu kết nối lỗi
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  )
}

export default App
