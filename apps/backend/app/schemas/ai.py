from pydantic import BaseModel, Field


class AIChatRequest(BaseModel):
    message: str = Field(..., description="Câu hỏi của người dùng gửi cho AI")
    session_id: str | None = Field(None, description="Mã phiên chat để lưu lịch sử")
    stream: bool = Field(False, description="Chế độ stream response")


class AIChatResponse(BaseModel):
    reply: str = Field(..., description="Câu trả lời từ AI")
    suggested_products: list[str] = Field(
        default_factory=list, description="Danh sách mã sản phẩm rượu gợi ý đi kèm"
    )
    session_id: str | None = Field(None, description="Mã phiên chat")
