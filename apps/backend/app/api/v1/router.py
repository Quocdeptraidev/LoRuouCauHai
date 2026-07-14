from fastapi import APIRouter
from app.api.v1.endpoints import products, ai

api_router = APIRouter()

# Đăng ký các router nhánh vào router v1 chính
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
