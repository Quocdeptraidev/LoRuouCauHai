from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, func
from app.repositories.base import BaseRepository
from app.models.product import ProductModel

class ProductRepository(BaseRepository[ProductModel]):
    def __init__(self, db: AsyncSession):
        super().__init__(ProductModel, db)

    async def search_products(self, query_str: str, skip: int = 0, limit: int = 10) -> list[ProductModel]:
        # Tìm kiếm sản phẩm theo tên hoặc mô tả
        query = (
            select(ProductModel)
            .where(
                or_(
                    ProductModel.name.ilike(f"%{query_str}%"),
                    ProductModel.description.ilike(f"%{query_str}%")
                )
            )
            .offset(skip)
            .limit(limit)
        )
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def count_search_products(self, query_str: str) -> int:
        query = (
            select(func.count())
            .select_from(ProductModel)
            .where(
                or_(
                    ProductModel.name.ilike(f"%{query_str}%"),
                    ProductModel.description.ilike(f"%{query_str}%")
                )
            )
        )
        result = await self.db.execute(query)
        return result.scalar() or 0

    async def get_total_count(self) -> int:
        query = select(func.count()).select_from(ProductModel)
        result = await self.db.execute(query)
        return result.scalar() or 0
