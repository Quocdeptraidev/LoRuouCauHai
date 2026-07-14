# Hướng Dẫn Cài Đặt và Thiết Lập - Lò Rượu Cậu Hai

Tài liệu này hướng dẫn chi tiết cách thiết lập môi trường phát triển (Development Environment) cho cả Frontend và Backend, chạy local và chạy thông qua Docker.

---

## 1. Yêu Cầu Hệ Thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
*   **Git** để clone và quản lý mã nguồn.
*   **Python 3.10+** (đối với Backend).
*   **Node.js 18+** và **npm** hoặc **yarn** (đối với Frontend).
*   **PostgreSQL 15+** (hỗ trợ extension `pgvector`) và **Redis** (đối với môi trường local không dùng Docker).
*   **Docker & Docker Compose** (khuyên dùng để thiết lập nhanh).

---

## 2. Cài Đặt & Chạy Môi Trường Local (Không dùng Docker)

### 2.1. Cấu Hình Backend (FastAPI)

1.  **Di chuyển vào thư mục backend:**
    ```bash
    cd apps/backend
    ```

2.  **Khởi tạo môi trường ảo Python (venv):**
    ```bash
    python -m venv .venv
    
    # Kích hoạt môi trường ảo:
    # Trên Windows:
    .venv\Scripts\activate
    # Trên macOS/Linux:
    source .venv/bin/activate
    ```

3.  **Cài đặt các dependency:**
    ```bash
    pip install --upgrade pip
    pip install -r requirements.txt
    ```

4.  **Cấu hình biến môi trường (.env):**
    Copy file mẫu `.env.example` (nếu có) thành `.env`:
    ```bash
    cp .env.example .env
    ```
    Cấu hình các giá trị kết nối cơ sở dữ liệu và AI API Key:
    ```ini
    DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/loruoucauhai
    REDIS_URL=redis://localhost:6379/0
    GEMINI_API_KEY=your_gemini_api_key_here
    OPENAI_API_KEY=your_openai_api_key_here
    ```

5.  **Chạy Database Migrations (Alembic):**
    ```bash
    alembic upgrade head
    ```

6.  **Khởi chạy Backend Server:**
    ```bash
    uvicorn app.main:app --reload --port 8000
    ```
    Swagger UI sẽ khả dụng tại: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 2.2. Cấu Hình Frontend (React + Vite)

1.  **Di chuyển vào thư mục frontend:**
    ```bash
    cd apps/frontend
    ```

2.  **Cài đặt các gói thư viện Node.js:**
    ```bash
    npm install
    ```

3.  **Cấu hình biến môi trường:**
    Tạo file `.env.local` trong thư mục `apps/frontend/`:
    ```ini
    VITE_API_URL=http://localhost:8000
    ```

4.  **Khởi chạy Development Server:**
    ```bash
    npm run dev
    ```
    Frontend sẽ chạy tại: [http://localhost:5173](http://localhost:5173)

---

## 3. Khởi Chạy Nhanh Bằng Docker Compose (Khuyên Dùng)

Docker Compose giúp bạn khởi chạy toàn bộ hệ thống bao gồm cả database PostgreSQL (có tích hợp `pgvector`) và Redis chỉ với một câu lệnh mà không cần cài đặt Python hay Node.js trên máy local.

1.  **Đứng tại thư mục root của dự án:**
    ```bash
    # Đảm bảo bạn đang ở thư mục root (chứa file docker-compose.yml)
    ```

2.  **Khởi chạy Docker Compose:**
    ```bash
    docker compose up -d --build
    ```
    Lệnh này sẽ tải các image cần thiết, build Dockerfile cho Backend và Frontend, sau đó chạy các container ngầm.

3.  **Kiểm tra trạng thái các container:**
    ```bash
    docker compose ps
    ```

4.  **Truy cập hệ thống:**
    *   **Frontend Web:** [http://localhost:3000](http://localhost:3000) (Serve bởi Nginx)
    *   **Backend Swagger API:** [http://localhost:8000/docs](http://localhost:8000/docs)
    *   **PostgreSQL:** Port `5432` trên localhost
    *   **Redis:** Port `6379` trên localhost

5.  **Tắt hệ thống:**
    ```bash
    docker compose down
    ```

---

## 4. Công Cụ Đảm Bảo Chất Lượng Code (Quality Control)

### Backend (Python)
Trước khi commit code backend, hãy chạy các công cụ kiểm tra lỗi và định dạng:
```bash
# Kiểm tra lỗi bằng Ruff
ruff check .

# Tự động format code bằng Ruff
ruff format .

# Kiểm tra kiểu tĩnh bằng MyPy
mypy app
```

### Frontend (Node/TypeScript)
Đảm bảo code frontend sạch đẹp và không có lỗi kiểu:
```bash
# Lint code
npm run lint

# Kiểm tra kiểu TypeScript
npm run build
```
