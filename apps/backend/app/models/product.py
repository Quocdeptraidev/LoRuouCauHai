from sqlalchemy import String, Numeric, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.database.base import Base


class ProductModel(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, index=True)
    name: Mapped[str] = mapped_column(
        String(255), unique=True, index=True, nullable=False
    )
    price: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    unit: Mapped[str] = mapped_column(String(50), default="Lít")
    volume_percent: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    description: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    stock: Mapped[int] = mapped_column(Integer, default=0)
    ingredients: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
    aging_time_months: Mapped[int] = mapped_column(Integer, default=0)
