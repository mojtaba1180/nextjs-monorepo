import { APIHttp, API_ENDPOINTS } from "../../utils";
import { APIHttpType } from "../../types";
import {
  IProduct,
  IProductCategory,
  ICreateProductRequest,
  IUpdateProductRequest,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "./type";

/**
 * Create a new product
 */
export function CreateProduct(
  productData: ICreateProductRequest
): Promise<APIHttpType<IProduct>> {
  return APIHttp.post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
}

/**
 * Update an existing product
 */
export function UpdateProduct(
  productData: IUpdateProductRequest
): Promise<APIHttpType<IProduct>> {
  const { id, ...updateData } = productData;
  return APIHttp.put(`${API_ENDPOINTS.PRODUCTS.UPDATE}/${id}`, updateData);
}

/**
 * Create a new product category
 */
export function CreateProductCategory(
  categoryData: ICreateCategoryRequest
): Promise<APIHttpType<IProductCategory>> {
  return APIHttp.post(API_ENDPOINTS.PRODUCTS.CATEGORIES, categoryData);
}

/**
 * Update an existing product category
 */
export function UpdateProductCategory(
  categoryData: IUpdateCategoryRequest
): Promise<APIHttpType<IProductCategory>> {
  const { id, ...updateData } = categoryData;
  return APIHttp.put(`${API_ENDPOINTS.PRODUCTS.CATEGORIES}/${id}`, updateData);
}

/**
 * Upload product image
 */
export function UploadProductImage(
  productId: string,
  imageFile: File
): Promise<APIHttpType<{ imageUrl: string }>> {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("productId", productId);

  return APIHttp.post(
    `${API_ENDPOINTS.PRODUCTS.UPDATE}/${productId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

/**
 * Bulk create products
 */
export function BulkCreateProducts(
  products: ICreateProductRequest[]
): Promise<APIHttpType<{ created: number; failed: number }>> {
  return APIHttp.post(`${API_ENDPOINTS.PRODUCTS.CREATE}/bulk`, { products });
}

/**
 * Bulk update products
 */
export function BulkUpdateProducts(
  updates: Array<{ id: string; data: Partial<ICreateProductRequest> }>
): Promise<APIHttpType<{ updated: number; failed: number }>> {
  return APIHttp.put(`${API_ENDPOINTS.PRODUCTS.UPDATE}/bulk`, { updates });
}
