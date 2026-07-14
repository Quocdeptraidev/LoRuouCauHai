from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    name: str = Field(..., max_length=255, description="Tên sản phẩm rượu")
    price: float = Field(..., gt=0, description="Giá sản phẩm")
    unit: str = Field("Lít", max_length=50, description="Đơn vị tính")
    volume_percent: float = Field(..., ge=0, le=100, description="Nồng độ cồn %")
    description: str | None = Field(None, max_length=1000, description="Mô tả chi tiết")
    image_url: str | None = Field(None, max_length=512, description="Ảnh sản phẩm")
    stock: int = Field(0, ge=0, description="Số lượng tồn kho")
    ingredients: list[str] | None = Field(None, description="Thành phần nguyên liệu")
    aging_time_months: int = Field(0, ge=0, description="Thời gian ngâm ủ (tháng)")


class ProductCreate(ProductBase):
    id: str = Field(
        ..., max_length=50, description="Mã sản phẩm duy nhất (ví dụ: prod_001)"
    )


class ProductUpdate(BaseModel):
    name: str | None = Field(None, max_length=255)
    price: float | None = Field(None, gt=0)
    unit: str | None = Field(None, max_length=50)
    volume_percent: float | None = Field(None, ge=0, le=100)
    description: str | None = Field(None, max_length=1000)
    image_url: str | None = Field(None, max_length=512)
    stock: int | None = Field(None, ge=0)
    ingredients: list[str] | None = Field(None)
    aging_time_months: int | None = Field(None, ge=0)


class ProductResponse(ProductBase):
    id: str

    class Config:
        from_attributes = True
