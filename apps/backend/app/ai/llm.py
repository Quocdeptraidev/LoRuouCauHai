import asyncio
import google.generativeai as genai
from app.core.config import settings

class GeminiClient:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        if self.api_key:
            genai.configure(api_key=self.api_key)
            # Khởi tạo model mặc định
            self.model = genai.GenerativeModel("gemini-1.5-flash")
        else:
            self.model = None

    async def generate_response(self, system_instruction: str, prompt: str) -> str:
        # Nếu chưa cấu hình API Key, trả về câu trả lời giả lập (Mock Mode) để test
        if not self.model:
            return (
                "Chào bạn! Cám ơn bạn đã liên hệ Lò Rượu Cậu Hai. "
                "Hiện tại module AI đang chạy ở chế độ giả lập (Mock Mode) do chưa cấu hình GEMINI_API_KEY. "
                "Tuy nhiên, sản phẩm rượu Nếp Cái Hoa Vàng (prod_001) ngâm hạ thổ 12 tháng đang bán rất chạy đó!"
            )
        try:
            loop = asyncio.get_event_loop()
            
            # Khởi tạo model kèm system instruction
            model_with_instruction = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=system_instruction
            )
            
            # Chạy đồng bộ SDK trong executor để không block event loop của FastAPI
            response = await loop.run_in_executor(
                None, 
                lambda: model_with_instruction.generate_content(prompt)
            )
            return response.text
        except Exception as e:
            return f"Đã xảy ra lỗi khi gọi AI Service: {str(e)}"

gemini_client = GeminiClient()
