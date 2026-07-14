from app.repositories.product import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate
from app.models.product import ProductModel

class ProductService:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    async def get_product_by_id(self, product_id: str) -> ProductModel | None:
        return await self.product_repo.get(product_id)

    async def get_all_products(self, skip: int = 0, limit: int = 10) -> list[ProductModel]:
        return list(await self.product_repo.get_multi(skip=skip, limit=limit))

    async def create_product(self, product_in: ProductCreate) -> ProductModel:
        db_obj = ProductModel(
            id=product_in.id,
            name=product_in.name,
            price=product_in.price,
            unit=product_in.unit,
            volume_percent=product_in.volume_percent,
            description=product_in.description,
            image_url=product_in.image_url,
            stock=product_in.stock,
            ingredients=product_in.ingredients,
            aging_time_months=product_in.aging_time_months
        )
        return await self.product_repo.create(db_obj)

    async def update_product(self, product_id: str, product_in: ProductUpdate) -> ProductModel | None:
        db_obj = await self.product_repo.get(product_id)
        if not db_obj:
            return None
        update_data = product_in.model_dump(exclude_unset=True)
        return await self.product_repo.update(db_obj, update_data)

    async def delete_product(self, product_id: str) -> ProductModel | None:
        return await self.product_repo.remove(product_id)

    async def search(self, query_str: str, skip: int = 0, limit: int = 10) -> tuple[list[ProductModel], int]:
        items = await self.product_repo.search_products(query_str, skip=skip, limit=limit)
        total = await self.product_repo.count_search_products(query_str)
        return items, total

    async def get_total(self) -> int:
        return await self.product_repo.get_total_count()
