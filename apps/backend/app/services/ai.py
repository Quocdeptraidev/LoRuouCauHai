from app.ai.llm import gemini_client
from app.ai.prompt import SYSTEM_PROMPT, build_rag_prompt
from app.repositories.product import ProductRepository
from app.schemas.ai import AIChatRequest, AIChatResponse

class AIService:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    async def chat_consultant(self, chat_in: AIChatRequest) -> AIChatResponse:
        # Tìm kiếm sản phẩm liên quan từ câu hỏi của khách hàng để làm RAG Context
        search_query = chat_in.message
        related_products = await self.product_repo.search_products(search_query, skip=0, limit=3)
        
        # Nếu không có sản phẩm khớp trực tiếp, lấy 3 sản phẩm đầu tiên làm kho tham khảo
        if not related_products:
            related_products = list(await self.product_repo.get_multi(skip=0, limit=3))

        # Tạo chuỗi thông tin ngữ cảnh sản phẩm gửi cho LLM
        context_parts = []
        suggested_ids = []
        for p in related_products:
            suggested_ids.append(p.id)
            context_parts.append(
                f"- Tên: {p.name} (Mã: {p.id})\n"
                f"  Giá: {float(p.price):,}đ/{p.unit}\n"
                f"  Nồng độ: {float(p.volume_percent)}%\n"
                f"  Mô tả: {p.description}\n"
                f"  Thời gian ngâm ủ: {p.aging_time_months} tháng"
            )
        
        context_str = "\n".join(context_parts) if context_parts else "Không có thông tin bổ sung."

        # Xây dựng prompt chứa context và câu hỏi
        prompt = build_rag_prompt(chat_in.message, context_str)

        # Gọi LLM sinh câu trả lời
        reply = await gemini_client.generate_response(
            system_instruction=SYSTEM_PROMPT,
            prompt=prompt
        )

        return AIChatResponse(
            reply=reply,
            suggested_products=suggested_ids,
            session_id=chat_in.session_id or "default_session"
        )
