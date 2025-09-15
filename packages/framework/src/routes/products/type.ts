import { PaginationParams, QueryParams } from "../../types";

/**
 * Product interface
 */
export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Product category interface
 */
export interface IProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: IProductCategory[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create product request interface
 */
export interface ICreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  isActive?: boolean;
}

/**
 * Update product request interface
 */
export interface IUpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  imageUrl?: string;
  isActive?: boolean;
}

/**
 * Product list query parameters
 */
export interface IProductListParams extends QueryParams {
  categoryId?: string;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Product detail query parameters
 */
export interface IProductDetailParams {
  id: string;
}

/**
 * Create category request interface
 */
export interface ICreateCategoryRequest {
  name: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}

/**
 * Update category request interface
 */
export interface IUpdateCategoryRequest {
  id: string;
  name?: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}

/**
 * Category list query parameters
 */
export interface ICategoryListParams extends PaginationParams {
  parentId?: string;
  isActive?: boolean;
}

/**
 * Product search parameters
 */
export interface IProductSearchParams extends QueryParams {
  query: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}
