from fastapi import APIRouter, Depends, HTTPException, status
from app.api.dependencies import get_product_service
from app.services.product import ProductService
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse

router = APIRouter()

@router.get("", response_model=dict)
async def read_products(
    page: int = 1,
    limit: int = 10,
    search: str | None = None,
    product_service: ProductService = Depends(get_product_service)
):
    skip = (page - 1) * limit
    if search:
        items, total = await product_service.search(search, skip=skip, limit=limit)
    else:
        items = await product_service.get_all_products(skip=skip, limit=limit)
        total = await product_service.get_total()
    
    return {
        "success": True,
        "data": {
            "items": [ProductResponse.model_validate(item) for item in items],
            "total": total,
            "page": page,
            "limit": limit
        }
    }

@router.get("/{product_id}", response_model=dict)
async def read_product(
    product_id: str,
    product_service: ProductService = Depends(get_product_service)
):
    product = await product_service.get_product_by_id(product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy sản phẩm có mã {product_id}"
        )
    return {
        "success": True,
        "data": ProductResponse.model_validate(product)
    }

@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_in: ProductCreate,
    product_service: ProductService = Depends(get_product_service)
):
    existing = await product_service.get_product_by_id(product_in.id)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Sản phẩm có mã {product_in.id} đã tồn tại"
        )
    product = await product_service.create_product(product_in)
    return {
        "success": True,
        "data": ProductResponse.model_validate(product),
        "message": "Đã tạo sản phẩm thành công"
    }

@router.put("/{product_id}", response_model=dict)
async def update_product(
    product_id: str,
    product_in: ProductUpdate,
    product_service: ProductService = Depends(get_product_service)
):
    product = await product_service.update_product(product_id, product_in)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy sản phẩm có mã {product_id}"
        )
    return {
        "success": True,
        "data": ProductResponse.model_validate(product),
        "message": "Cập nhật sản phẩm thành công"
    }

@router.delete("/{product_id}", response_model=dict)
async def delete_product(
    product_id: str,
    product_service: ProductService = Depends(get_product_service)
):
    product = await product_service.delete_product(product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy sản phẩm có mã {product_id}"
        )
    return {
        "success": True,
        "message": f"Đã xóa sản phẩm {product_id} thành công"
    }
