import { AxiosResponse } from "axios";

/**
 * Base response type for all API responses
 */
export type BaseResponseType<T> = {
  result: { 
    status: string; 
    message: string; 
  };
  entries: Array<T>;
};

/**
 * Paginated response type for paginated API responses
 */
export type PaginatedResponse<T> = {
  result: { 
    status: string; 
    message: string; 
  };
  entries: Array<T>;
  metadata: { 
    totalRows: number; 
    pageCount: number; 
  };
};

/**
 * HTTP response types
 */
export type APIHttpType<T> = AxiosResponse<BaseResponseType<T>>;
export type APIHttpPaginatedType<T> = AxiosResponse<PaginatedResponse<T> | null>;

/**
 * Common pagination parameters
 */
export interface PaginationParams {
  pageNo?: number;
  rowCount?: number;
}

/**
 * Common query parameters
 */
export interface QueryParams extends PaginationParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * API Error type
 */
export interface APIError {
  message: string;
  status: number;
  code?: string;
}

/**
 * Generic hook options
 */
export interface HookOptions {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number; // formerly cacheTime
}

/**
 * Mutation options
 */
export interface MutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}
