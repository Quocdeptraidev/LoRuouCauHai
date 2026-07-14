from fastapi import APIRouter, Depends
from app.api.dependencies import get_ai_service
from app.services.ai import AIService
from app.schemas.ai import AIChatRequest

router = APIRouter()


@router.post("/chat", response_model=dict)
async def chat_with_assistant(
    chat_in: AIChatRequest, ai_service: AIService = Depends(get_ai_service)
):
    response = await ai_service.chat_consultant(chat_in)
    return {
        "success": True,
        "data": {
            "reply": response.reply,
            "suggested_products": response.suggested_products,
            "session_id": response.session_id,
        },
    }
