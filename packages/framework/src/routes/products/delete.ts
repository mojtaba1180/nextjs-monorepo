import { APIHttp, API_ENDPOINTS } from "../../utils";
import { APIHttpType } from "../../types";

/**
 * Delete a product by ID
 */
export function DeleteProduct(productId: string): Promise<APIHttpType<{ message: string }>> {
  return APIHttp.delete(`${API_ENDPOINTS.PRODUCTS.DELETE}/${productId}`);
}

/**
 * Delete a product category by ID
 */
export function DeleteProductCategory(categoryId: string): Promise<APIHttpType<{ message: string }>> {
  return APIHttp.delete(`${API_ENDPOINTS.PRODUCTS.CATEGORIES}/${categoryId}`);
}

/**
 * Bulk delete products
 */
export function BulkDeleteProducts(productIds: string[]): Promise<APIHttpType<{ deleted: number; failed: number }>> {
  return APIHttp.delete(`${API_ENDPOINTS.PRODUCTS.DELETE}/bulk`, {
    data: { productIds },
  });
}

/**
 * Bulk delete product categories
 */
export function BulkDeleteProductCategories(categoryIds: string[]): Promise<APIHttpType<{ deleted: number; failed: number }>> {
  return APIHttp.delete(`${API_ENDPOINTS.PRODUCTS.CATEGORIES}/bulk`, {
    data: { categoryIds },
  });
}

/**
 * Soft delete a product (mark as inactive)
 */
export function SoftDeleteProduct(productId: string): Promise<APIHttpType<{ message: string }>> {
  return APIHttp.patch(`${API_ENDPOINTS.PRODUCTS.DELETE}/${productId}/soft`);
}

/**
 * Restore a soft-deleted product
 */
export function RestoreProduct(productId: string): Promise<APIHttpType<{ message: string }>> {
  return APIHttp.patch(`${API_ENDPOINTS.PRODUCTS.DELETE}/${productId}/restore`);
}
