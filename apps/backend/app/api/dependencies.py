from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from app.database.session import async_session_local
from app.repositories.product import ProductRepository
from app.services.product import ProductService
from app.services.ai import AIService

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_local() as session:
        yield session

def get_product_repository(db: AsyncSession = Depends(get_db)) -> ProductRepository:
    return ProductRepository(db)

def get_product_service(
    product_repo: ProductRepository = Depends(get_product_repository)
) -> ProductService:
    return ProductService(product_repo)

def get_ai_service(
    product_repo: ProductRepository = Depends(get_product_repository)
) -> AIService:
    return AIService(product_repo)
