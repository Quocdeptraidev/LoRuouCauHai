# Lò Rượu Cậu Hai - Monorepo Project

Chào mừng bạn đến với dự án **Lò Rượu Cậu Hai**. Đây là hệ thống giới thiệu sản phẩm rượu truyền thống kết hợp Trợ lý tư vấn AI thông minh được xây dựng dưới dạng Monorepo bao gồm cả Backend (FastAPI) và Frontend (React + Vite + TypeScript).

---

## 📁 Cấu Trúc Dự Án (Project Structure)

Dự án được quản lý theo dạng Monorepo với cấu trúc như sau:

```text
├── apps/
│   ├── backend/             # Source code FastAPI & Module AI
│   │   ├── app/             # Các tầng API, Services, Repositories, AI RAG
│   │   ├── Dockerfile       # Dockerfile cho Backend
│   │   └── README.md        # Hướng dẫn chi tiết Backend
│   └── frontend/            # Source code React + TS + Vite
│       ├── src/             # Components, Pages, State, Hooks
│       ├── Dockerfile       # Dockerfile cho Frontend
│       ├── nginx.conf       # Cấu hình Nginx cho Frontend
│       └── README.md        # Hướng dẫn chi tiết Frontend
├── docs/                    # Thư mục chứa tài liệu hướng dẫn chi tiết
│   ├── architecture.md      # Tài liệu kiến trúc hệ thống & RAG Flow
│   ├── setup_guide.md       # Hướng dẫn thiết lập chi tiết local & Docker
│   └── api_specification.md # Đặc tả các API Endpoints
├── docker-compose.yml       # File điều phối Docker Compose toàn bộ hệ thống
├── .gitignore               # Cấu hình Git chung cho dự án
└── README.md                # Tài liệu hướng dẫn tổng quan (File này)
```

---

## 🛠️ Hướng Dẫn Khởi Chạy Nhanh (Quick Start)

Cách nhanh nhất để chạy toàn bộ hệ thống (bao gồm Frontend, Backend, PostgreSQL và Redis) là sử dụng Docker Compose.

### Bước 1: Chuẩn bị biến môi trường
Tạo file `.env` ở thư mục root (cùng cấp với file `docker-compose.yml`) và điền các API Key của LLM:
```ini
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### Bước 2: Chạy hệ thống bằng Docker Compose
Khởi chạy các container bằng lệnh sau:
```bash
docker compose up -d --build
```

### Bước 3: Truy cập ứng dụng
*   **Giao diện Frontend:** [http://localhost:3000](http://localhost:3000)
*   **Backend API (Swagger Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)
*   **Cơ sở dữ liệu PostgreSQL:** Port `5432`
*   **Redis Cache/Queue:** Port `6379`

---

## 📖 Tài Liệu Chi Tiết (Documentation)

Hãy tham khảo các tài liệu chi tiết hơn trong thư mục `docs/` để bắt đầu phát triển:

*   **[Kiến Trúc Hệ Thống](file:///d:/LoRuouCauHai/docs/architecture.md):** Giải thích chi tiết về luồng hoạt động của API, module AI, luồng RAG và Agentic Workflow.
*   **[Hướng Dẫn Thiết Lập Local](file:///d:/LoRuouCauHai/docs/setup_guide.md):** Hướng dẫn cài đặt Python ảo hóa (venv), Node.js, khởi tạo database và các lệnh phát triển (Ruff format, Mypy check, Unit tests).
*   **[Đặc Tả API](file:///d:/LoRuouCauHai/docs/api_specification.md):** Danh sách các API endpoints về Authentication, quản lý Sản Phẩm, Đơn Hàng và Trợ lý AI Chat.

---

## 🤝 Thành Viên Phát Triển

*   **Lò Rượu Cậu Hai Team** - Phát triển chưng cất rượu truyền thống và ứng dụng chuyển đổi số.
