# Python Backend RESTful API + GenAI Architecture

## Recommended Stack

-   Framework: FastAPI
-   Validation: Pydantic
-   ORM: SQLAlchemy 2.0
-   Migration: Alembic
-   Database: PostgreSQL
-   Cache: Redis
-   Background Jobs: Celery hoặc ARQ
-   AI: OpenAI / Anthropic / Gemini SDK, LangChain (nếu cần), LlamaIndex
    (tùy use case)
-   Testing: pytest
-   Lint & Format: Ruff + MyPy

------------------------------------------------------------------------

## Folder Structure

``` text
app/
├── api/
│   ├── v1/
│   └── dependencies.py
├── core/
│   ├── config.py
│   ├── security.py
│   ├── logger.py
│   ├── middleware.py
│   └── exception.py
├── database/
│   ├── session.py
│   ├── base.py
│   └── migrations/
├── models/
├── schemas/
├── repositories/
├── services/
├── ai/
│   ├── llm.py
│   ├── prompt.py
│   ├── embeddings.py
│   ├── vector_store.py
│   ├── rag.py
│   └── tools.py
├── workers/
├── utils/
├── tests/
└── main.py
```

## Layered Architecture

Client

↓

Router (API)

↓

Service

↓

Repository

↓

Database

### Responsibilities

### Router

-   Nhận request
-   Validate dữ liệu
-   Gọi Service
-   Trả Response

### Service

-   Business logic
-   Gọi Repository
-   Gọi AI Service
-   Gọi External API

### Repository

-   CRUD
-   Query Database
-   Không chứa business logic

### Models

-   SQLAlchemy entities

### Schemas

-   Pydantic request/response

------------------------------------------------------------------------

# AI Architecture

User

↓

Chat API

↓

Chat Service

↓

AI Service

├── Prompt Builder

├── RAG Retriever

├── Tool Calling

├── LLM

└── Response Formatter

------------------------------------------------------------------------

# RAG Flow

User Question

↓

Embedding

↓

Vector Database

↓

Relevant Documents

↓

Prompt Builder

↓

LLM

↓

Answer

------------------------------------------------------------------------

# Agent Flow

User

↓

Planner

↓

Tool Calling

↓

External APIs

↓

LLM

↓

Final Answer

------------------------------------------------------------------------

# Best Practices

-   Không viết business logic trong Router.
-   Repository chỉ truy cập database.
-   Tách AI thành module riêng (`app/ai`).
-   Dùng Dependency Injection của FastAPI.
-   Chuẩn hóa response và exception.
-   Dùng Alembic cho migration.
-   Dùng pytest để test.
-   Dùng Ruff + MyPy để đảm bảo chất lượng code.

------------------------------------------------------------------------

# Suggested Tech Stack

-   FastAPI
-   SQLAlchemy 2.0
-   PostgreSQL
-   Redis
-   Alembic
-   Celery / ARQ
-   OpenAI SDK / Anthropic SDK / Gemini SDK
-   pgvector (RAG)
-   Docker
-   Nginx
-   GitHub Actions (CI/CD)

------------------------------------------------------------------------

# Typical Request Flow

Request

↓

Middleware

↓

Router

↓

Service

↓

Repository

↓

Database

↓

Service

↓

Response
