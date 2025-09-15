import {
  useGenericQuery,
  useGenericQueryWithParams,
  useGenericMutation,
  useGenericMutationWithOptimisticUpdate,
  useGenericUploadMutation,
} from "../../utils";
import {
  GetProductsList,
  GetProductDetail,
  GetProductCategories,
  GetProductCategoriesTree,
  SearchProducts,
} from "./get";
import {
  CreateProduct,
  UpdateProduct,
  CreateProductCategory,
  UpdateProductCategory,
  UploadProductImage,
  BulkCreateProducts,
  BulkUpdateProducts,
} from "./post";
import {
  DeleteProduct,
  DeleteProductCategory,
  BulkDeleteProducts,
  BulkDeleteProductCategories,
  SoftDeleteProduct,
  RestoreProduct,
} from "./delete";
import {
  IProduct,
  IProductCategory,
  IProductListParams,
  IProductDetailParams,
  ICategoryListParams,
  IProductSearchParams,
  ICreateProductRequest,
  IUpdateProductRequest,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "./type";

// ===== PRODUCT QUERIES =====

/**
 * Hook to get products list
 */
export const useProductsQuery = (params?: IProductListParams) =>
  useGenericQueryWithParams(
    GetProductsList,
    ["get-products-list"],
    params || {},
    {
      enabled: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );

/**
 * Hook to get single product detail
 */
export const useProductDetailQuery = (params: IProductDetailParams) =>
  useGenericQueryWithParams(
    GetProductDetail,
    ["get-product-detail"],
    params,
    {
      enabled: !!params.id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

/**
 * Hook to search products
 */
export const useProductSearchQuery = (params: IProductSearchParams) =>
  useGenericQueryWithParams(
    SearchProducts,
    ["search-products"],
    params,
    {
      enabled: !!params.query && params.query.length >= 2,
      staleTime: 1 * 60 * 1000, // 1 minute
    }
  );

// ===== CATEGORY QUERIES =====

/**
 * Hook to get product categories
 */
export const useProductCategoriesQuery = (params?: ICategoryListParams) =>
  useGenericQueryWithParams(
    GetProductCategories,
    ["get-product-categories"],
    params || {},
    {
      enabled: true,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

/**
 * Hook to get product categories tree
 */
export const useProductCategoriesTreeQuery = () =>
  useGenericQuery(
    GetProductCategoriesTree,
    ["get-product-categories-tree"],
    {
      enabled: true,
      staleTime: 15 * 60 * 1000, // 15 minutes
    }
  );

// ===== PRODUCT MUTATIONS =====

/**
 * Hook to create a new product
 */
export const useCreateProductMutation = () =>
  useGenericMutation(
    CreateProduct,
    ["get-products-list", "get-product-categories"],
    {
      onSuccess: (data) => {
        console.log("Product created successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to create product:", error);
      },
    }
  );

/**
 * Hook to update a product with optimistic updates
 */
export const useUpdateProductMutation = () =>
  useGenericMutationWithOptimisticUpdate(
    UpdateProduct,
    ["get-products-list", "get-product-detail"],
    (oldData: any, variables: IUpdateProductRequest) => {
      // Optimistic update logic
      if (oldData?.entries) {
        return {
          ...oldData,
          entries: oldData.entries.map((product: IProduct) =>
            product.id === variables.id ? { ...product, ...variables } : product
          ),
        };
      }
      return oldData;
    },
    {
      onSuccess: (data) => {
        console.log("Product updated successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to update product:", error);
      },
    }
  );

/**
 * Hook to delete a product
 */
export const useDeleteProductMutation = () =>
  useGenericMutation(
    DeleteProduct,
    ["get-products-list", "get-product-detail"],
    {
      onSuccess: (data) => {
        console.log("Product deleted successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to delete product:", error);
      },
    }
  );

/**
 * Hook to upload product image
 */
export const useUploadProductImageMutation = () =>
  useGenericUploadMutation(
    ({ productId, imageFile }: { productId: string; imageFile: File }) =>
      UploadProductImage(productId, imageFile),
    ["get-product-detail"],
    {
      onSuccess: (data) => {
        console.log("Image uploaded successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to upload image:", error);
      },
    }
  );

/**
 * Hook to bulk create products
 */
export const useBulkCreateProductsMutation = () =>
  useGenericMutation(
    BulkCreateProducts,
    ["get-products-list"],
    {
      onSuccess: (data) => {
        console.log("Products created successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to create products:", error);
      },
    }
  );

/**
 * Hook to bulk update products
 */
export const useBulkUpdateProductsMutation = () =>
  useGenericMutation(
    BulkUpdateProducts,
    ["get-products-list"],
    {
      onSuccess: (data) => {
        console.log("Products updated successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to update products:", error);
      },
    }
  );

/**
 * Hook to bulk delete products
 */
export const useBulkDeleteProductsMutation = () =>
  useGenericMutation(
    BulkDeleteProducts,
    ["get-products-list"],
    {
      onSuccess: (data) => {
        console.log("Products deleted successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to delete products:", error);
      },
    }
  );

// ===== CATEGORY MUTATIONS =====

/**
 * Hook to create a new product category
 */
export const useCreateProductCategoryMutation = () =>
  useGenericMutation(
    CreateProductCategory,
    ["get-product-categories", "get-product-categories-tree"],
    {
      onSuccess: (data) => {
        console.log("Category created successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to create category:", error);
      },
    }
  );

/**
 * Hook to update a product category
 */
export const useUpdateProductCategoryMutation = () =>
  useGenericMutation(
    UpdateProductCategory,
    ["get-product-categories", "get-product-categories-tree"],
    {
      onSuccess: (data) => {
        console.log("Category updated successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to update category:", error);
      },
    }
  );

/**
 * Hook to delete a product category
 */
export const useDeleteProductCategoryMutation = () =>
  useGenericMutation(
    DeleteProductCategory,
    ["get-product-categories", "get-product-categories-tree"],
    {
      onSuccess: (data) => {
        console.log("Category deleted successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to delete category:", error);
      },
    }
  );
