import { APIHttp, API_ENDPOINTS } from "../../utils";
import { 
  APIHttpType, 
  APIHttpPaginatedType 
} from "../../types";
import {
  IProduct,
  IProductCategory,
  IProductListParams,
  IProductDetailParams,
  ICategoryListParams,
  IProductSearchParams,
} from "./type";

/**
 * Get products list with pagination and filters
 */
export function GetProductsList(
  params?: IProductListParams
): Promise<APIHttpPaginatedType<IProduct>> {
  return APIHttp.get(API_ENDPOINTS.PRODUCTS.LIST, {
    params: {
      pageNo: params?.pageNo || 1,
      rowCount: params?.rowCount || 10,
      search: params?.search,
      sortBy: params?.sortBy,
      sortOrder: params?.sortOrder,
      categoryId: params?.categoryId,
      isActive: params?.isActive,
      minPrice: params?.minPrice,
      maxPrice: params?.maxPrice,
    },
  });
}

/**
 * Get single product by ID
 */
export function GetProductDetail(
  params: IProductDetailParams
): Promise<APIHttpType<IProduct>> {
  return APIHttp.get(`${API_ENDPOINTS.PRODUCTS.LIST}/${params.id}`);
}

/**
 * Get product categories list
 */
export function GetProductCategories(
  params?: ICategoryListParams
): Promise<APIHttpPaginatedType<IProductCategory>> {
  return APIHttp.get(API_ENDPOINTS.PRODUCTS.CATEGORIES, {
    params: {
      pageNo: params?.pageNo || 1,
      rowCount: params?.rowCount || 50,
      parentId: params?.parentId,
      isActive: params?.isActive,
    },
  });
}

/**
 * Get product categories tree (hierarchical structure)
 */
export function GetProductCategoriesTree(): Promise<APIHttpType<IProductCategory[]>> {
  return APIHttp.get(`${API_ENDPOINTS.PRODUCTS.CATEGORIES}/tree`);
}

/**
 * Search products
 */
export function SearchProducts(
  params: IProductSearchParams
): Promise<APIHttpPaginatedType<IProduct>> {
  return APIHttp.get(API_ENDPOINTS.PRODUCTS.SEARCH, {
    params: {
      query: params.query,
      pageNo: params.pageNo || 1,
      rowCount: params.rowCount || 10,
      categoryId: params.categoryId,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
    },
  });
}
