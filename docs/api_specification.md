# Đặc Tả API - Lò Rượu Cậu Hai

Tài liệu này đặc tả các API endpoints chính của hệ thống Lò Rượu Cậu Hai. Tất cả các endpoint đều có tiền tố mặc định là `/api/v1`.

---

## 1. Định Dạng Response Chung (Standard Response Format)

Hệ thống sử dụng định dạng JSON chuẩn cho tất cả các response:

### Response Thành Công (200 OK, 201 Created):
```json
{
  "success": true,
  "data": { ... },
  "message": "Thao tác thành công"
}
```

### Response Lỗi (400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error):
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Chi tiết thông tin lỗi xảy ra",
    "details": null
  }
}
```

---

## 2. Các API Endpoints Chính

### 2.1. Xác Thực & Người Dùng (Authentication)

#### 🔑 Đăng ký tài khoản mới
*   **Method:** `POST`
*   **Path:** `/auth/register`
*   **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "StrongPassword123",
      "full_name": "Nguyễn Văn A",
      "phone": "0987654321"
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "success": true,
      "data": {
        "id": "usr_901238912",
        "email": "user@example.com",
        "full_name": "Nguyễn Văn A",
        "role": "customer"
      },
      "message": "Đăng ký tài khoản thành công"
    }
    ```

#### 🔑 Đăng nhập lấy Access Token
*   **Method:** `POST`
*   **Path:** `/auth/login`
*   **Request Body (OAuth2 Form URL Encoded hoặc JSON):**
    ```json
    {
      "username": "user@example.com",
      "password": "StrongPassword123"
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
        "token_type": "bearer",
        "expires_in": 86400
      },
      "message": "Đăng nhập thành công"
    }
    ```

---

### 2.2. Quản Lý Sản Phẩm Rượu (Products)

#### 🍶 Lấy danh sách sản phẩm (có phân trang & lọc)
*   **Method:** `GET`
*   **Path:** `/products`
*   **Query Parameters:**
    *   `page` (int, default: 1)
    *   `limit` (int, default: 10)
    *   `search` (string, optional)
    *   `category` (string, optional - e.g., "ruou_nep", "ruou_ngam")
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "items": [
          {
            "id": "prod_001",
            "name": "Rượu Nếp Cái Hoa Vàng",
            "price": 150000,
            "unit": "Lít",
            "volume_percent": 35.0,
            "description": "Rượu nếp cái hoa vàng được chưng cất thủ công truyền thống...",
            "image_url": "https://cdn.example.com/ruou-nep.jpg",
            "stock": 500
          }
        ],
        "total": 1,
        "page": 1,
        "limit": 10
      }
    }
    ```

#### 🍶 Xem chi tiết sản phẩm
*   **Method:** `GET`
*   **Path:** `/products/{product_id}`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "id": "prod_001",
        "name": "Rượu Nếp Cái Hoa Vàng",
        "price": 150000,
        "unit": "Lít",
        "volume_percent": 35.0,
        "description": "Rượu nếp cái hoa vàng được chưng cất thủ công truyền thống...",
        "image_url": "https://cdn.example.com/ruou-nep.jpg",
        "stock": 500,
        "ingredients": ["Gạo nếp cái hoa vàng", "Men thuốc bắc 36 vị"],
        "aging_time_months": 12
      }
    }
    ```

---

### 2.3. Quản Lý Đơn Hàng (Orders)

> [!NOTE]
> Các API này yêu cầu Header: `Authorization: Bearer <token>`

#### 📦 Tạo đơn hàng mới
*   **Method:** `POST`
*   **Path:** `/orders`
*   **Request Body:**
    ```json
    {
      "items": [
        {
          "product_id": "prod_001",
          "quantity": 5
        }
      ],
      "shipping_address": "Số 12, Ngõ 34, Đường Láng, Hà Nội",
      "payment_method": "COD"
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "success": true,
      "data": {
        "order_id": "ord_891273912",
        "status": "pending",
        "total_amount": 750000,
        "shipping_address": "Số 12, Ngõ 34, Đường Láng, Hà Nội",
        "created_at": "2026-07-14T14:25:00Z"
      },
      "message": "Đơn hàng đã được tạo thành công"
    }
    ```

---

### 2.4. Trợ Lý Tư Vấn AI Chat (AI Assistant)

#### 💬 Chat với AI tư vấn rượu (Hỗ trợ Stream / Non-Stream)
*   **Method:** `POST`
*   **Path:** `/ai/chat`
*   **Request Body:**
    ```json
    {
      "message": "Tôi muốn tìm một loại rượu êm, ngọt để tặng bố vợ",
      "session_id": "chat_session_881273",
      "stream": false
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "reply": "Chào bạn! Đối với làm quà tặng bố vợ và thích vị êm, ngọt dịu dễ uống, tôi đặc biệt gợi ý **Rượu Nếp Cái Hoa Vàng ngâm hạ thổ 12 tháng** của Lò Rượu Cậu Hai. Sản phẩm có nồng độ 35%, vị ngọt hậu từ nếp và hương thơm của men thuốc bắc chưng cất truyền thống. Bạn có muốn xem thêm chi tiết về sản phẩm này không?",
        "suggested_products": ["prod_001"],
        "session_id": "chat_session_881273"
      }
    }
    ```
