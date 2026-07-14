# Python Backend RESTful API + GenAI Architecture

Dự án này là một boilerplate / template backend hiệu năng cao được xây dựng trên nền tảng **FastAPI**, tích hợp các mô-đun Generative AI (GenAI), Retrieval-Augmented Generation (RAG), và Agentic Workflow. Hệ thống được thiết kế theo kiến trúc phân lớp (Layered Architecture) giúp dễ dàng bảo trì, mở rộng và viết unit test.

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

*   **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Hỗ trợ async/await hiệu năng cao)
*   **Validation & Serialization:** [Pydantic v2](https://docs.pydantic.dev/)
*   **ORM:** [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (Hỗ trợ kiểu dữ liệu an toàn và bất đồng bộ)
*   **Database Migrations:** [Alembic](https://alembic.sqlalchemy.org/)
*   **Database:** PostgreSQL (Hỗ trợ extension `pgvector` cho tìm kiếm vector)
*   **Caching & Broker:** [Redis](https://redis.io/)
*   **Background Tasks:** [Celery](https://docs.celeryq.dev/) hoặc [ARQ](https://github.com/samuelcolvin/arq)
*   **AI Integration:** OpenAI / Anthropic / Gemini SDK, LlamaIndex hoặc LangChain
*   **Quality Assurance (QA):** [pytest](https://docs.pytest.org/), [Ruff](https://github.com/astral-sh/ruff) (Linter & Formatter), [MyPy](https://mypy-lang.org/) (Static Type Checker)
*   **Deployment:** Docker, Nginx, GitHub Actions (CI/CD)

---

## 📁 Cấu Trúc Thư Mục (Folder Structure)

```text
app/
├── api/                    # Tầng giao tiếp (Transport Layer / Routers)
│   ├── v1/                 # API endpoints phiên bản 1
│   └── dependencies.py     # Quản lý FastAPI Dependencies (Inject DB session, Current User, etc.)
├── core/                   # Cấu hình hệ thống (System Core Configurations)
│   ├── config.py           # Quản lý biến môi trường (pydantic-settings)
│   ├── security.py         # Mã hóa mật khẩu, JWT tokens
│   ├── logger.py           # Cấu hình log tập trung
│   ├── middleware.py       # CORS, Tracing, Rate-limiting middlewares
│   └── exception.py        # Định nghĩa lỗi và Custom Exception Handlers
├── database/               # Cấu hình Database & Migrations
│   ├── session.py          # Khởi tạo engine & async_sessionmaker
│   ├── base.py             # Base class cho SQLAlchemy models
│   └── migrations/         # Thư mục lưu trữ file migration của Alembic
├── models/                 # Các thực thể database (SQLAlchemy models)
├── schemas/                # Data Transfer Objects (Pydantic models)
├── repositories/           # Tầng truy xuất dữ liệu (Data Access Layer - CRUD)
├── services/               # Tầng nghiệp vụ chính (Business Logic Layer)
├── ai/                     # Module xử lý GenAI & RAG
│   ├── llm.py              # Cấu hình và kết nối LLM Providers
│   ├── prompt.py           # Quản lý Prompt Templates
│   ├── embeddings.py       # Xử lý Vectorization (văn bản -> vector)
│   ├── vector_store.py     # Tương tác với pgvector hoặc Vector DB
│   ├── rag.py              # Triển khai RAG pipeline
│   └── tools.py            # Định nghĩa các tool phục vụ Agent
├── workers/                # Định nghĩa các background tasks (Celery/ARQ workers)
├── utils/                  # Thư mục helper, các tiện ích dùng chung
├── tests/                  # Kiểm thử tự động (pytest)
└── main.py                 # Điểm khởi chạy ứng dụng (Entrypoint)
```

---

## 🏗️ Kiến Trúc Hệ Thống (Architecture Flow)

### 1. Luồng Yêu Cầu RESTful API thông thường
Kiến trúc phân tách rõ ràng nhiệm vụ giữa các lớp (Layers):
```text
Client ──► Router (api/) ──► Service (services/) ──► Repository (repositories/) ──► Database
```
*   **Router:** Nhận request, thực hiện validate dữ liệu đầu vào bằng Pydantic schemas, gọi tầng Service và trả kết quả về cho Client. Không chứa logic xử lý DB hay logic nghiệp vụ.
*   **Service:** Chứa business logic, tích hợp gọi các API bên ngoài hoặc module AI, điều phối các Repository.
*   **Repository:** Nhận lệnh từ Service để thực hiện các câu lệnh SQL CRUD xuống Database. Không chứa business logic.

---

### 2. Luồng Xử Lý Generative AI (GenAI & RAG Flow)
Khi người dùng tương tác với tính năng AI (ví dụ: chatbot có dữ liệu tri thức nội bộ):
```text
User Question
      │
      ▼
┌──────────────┐      ┌─────────────────┐
│  Embeddings  │ ───► │ Vector Database │
└──────────────┘      │   (pgvector)    │
                      └────────┬────────┘
                               │ Lấy tài liệu liên quan
                               ▼
┌──────────────┐      ┌─────────────────┐      ┌─────┐      ┌────────┐
│ Prompt Build │ ◄─── │    Retrieved    │      │ LLM │ ───► │ Answer │
│  (prompts/)  │      │    Documents    │      └─────┘      └────────┘
└──────┬───────┘      └─────────────────┘
       │
       └──────────────────────────────────────────▲
```
1.  **User Question:** Nhận câu hỏi từ phía người dùng.
2.  **Embedding:** Vector hóa câu hỏi thông qua `ai/embeddings.py`.
3.  **Vector DB Lookup:** Truy vấn tìm kiếm tài liệu tương đồng trong `vector_store.py` sử dụng `pgvector`.
4.  **Prompt Builder:** Tích hợp nội dung tài liệu tìm được (Context) vào Prompt Template định sẵn trong `ai/prompt.py`.
5.  **LLM Call:** Gửi Prompt hoàn chỉnh tới LLM thông qua `ai/llm.py` để sinh câu trả lời chính xác (`Answer`).

---

### 3. Luồng Tác Tử (Agentic Workflow)
Đối với các bài toán cần lập kế hoạch phức tạp và thực thi đa bước:
```text
User ──► Planner (LLM) ──► Tool Calling (ai/tools.py) ──► External APIs ──► LLM ──► Final Answer
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Hệ Thống
*   Python 3.10+
*   PostgreSQL (có cài đặt extension `pgvector`)
*   Redis

### 1. Khởi tạo môi trường ảo & Cài đặt thư viện
Khuyến khích sử dụng **Poetry** hoặc tạo venv thông thường:
```bash
# Sử dụng venv chuẩn
python -m venv .venv
source .venv/bin/activate  # Trên Windows: .venv\Scripts\activate

# Nâng cấp pip và cài đặt thư viện
pip install -r requirements.txt
```

### 2. Cấu hình biến môi trường
Sao chép file `.env.example` thành `.env` và điền đầy đủ các cấu hình cần thiết:
```bash
cp .env.example .env
```
Các cấu hình quan trọng bao gồm:
*   `DATABASE_URL`: Đường dẫn kết nối PostgreSQL (ví dụ: `postgresql+asyncpg://user:pass@localhost:5432/db_name`)
*   `REDIS_URL`: Kết nối Redis (ví dụ: `redis://localhost:6379/0`)
*   `OPENAI_API_KEY` / `GEMINI_API_KEY`: API keys dùng cho Module AI.

### 3. Thực thi Database Migrations
Khởi chạy migration để đồng bộ database schema:
```bash
alembic upgrade head
```

### 4. Khởi chạy ứng dụng
Chạy ứng dụng bằng `uvicorn` ở chế độ development mode:
```bash
uvicorn app.main:app --reload
```
Truy cập tài liệu API (Swagger UI) tại: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🧪 Đảm Bảo Chất Lượng Code (Quality Control)

### Khởi chạy Unit Test
```bash
pytest
```

### Format và Lint code với Ruff
```bash
# Kiểm tra lỗi
ruff check .

# Tự động sửa lỗi format
ruff format .
```

### Kiểm tra kiểu tĩnh (Static Type Checking)
```bash
mypy app
```
