import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { HookOptions } from "../types";

/**
 * Generic query hook for GET requests
 * Provides consistent query behavior across the application
 */
export const useGenericQuery = <TData, TError = Error>(
  queryFn: () => Promise<TData>,
  queryKey: readonly [string] | readonly [string, ...string[]],
  options?: HookOptions & Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    enabled: options?.enabled,
    staleTime: options?.staleTime || 5 * 60 * 1000, // 5 minutes default
    gcTime: options?.gcTime || 10 * 60 * 1000, // 10 minutes default
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};

/**
 * Generic query hook with parameters
 * Useful for queries that depend on parameters
 */
export const useGenericQueryWithParams = <TData, TParams = any, TError = Error>(
  queryFn: (params: TParams) => Promise<TData>,
  queryKey: readonly [string] | readonly [string, ...string[]],
  params: TParams,
  options?: HookOptions & Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    queryKey: [...queryKey, JSON.stringify(params)],
    queryFn: () => queryFn(params),
    enabled: options?.enabled !== false && params !== undefined,
    staleTime: options?.staleTime || 5 * 60 * 1000,
    gcTime: options?.gcTime || 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};

/**
 * Generic infinite query hook for pagination
 */
export const useGenericInfiniteQuery = <TData, TError = Error>(
  queryFn: (params: { pageParam?: number }) => Promise<TData>,
  queryKey: readonly [string] | readonly [string, ...string[]],
  options?: HookOptions & Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: () => queryFn({ pageParam: 1 }),
    enabled: options?.enabled,
    staleTime: options?.staleTime || 5 * 60 * 1000,
    gcTime: options?.gcTime || 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};
