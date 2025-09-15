import { 
  useMutation, 
  UseMutationOptions, 
  UseMutationResult,
  useQueryClient 
} from "@tanstack/react-query";
import { MutationOptions } from "../types";

/**
 * Generic mutation hook for POST/PUT/DELETE requests
 * Provides consistent mutation behavior across the application
 */
export const useGenericMutation = <TData, TVariables, TError = Error>(
  mutationFn: (data: TVariables) => Promise<TData>,
  queryKey: readonly string[],
  options?: MutationOptions<TData, TVariables> & Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey });
      
      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables);
    },
    onError: (error: TError, variables: TVariables) => {
      // Call custom onError if provided
      options?.onError?.(error as any, variables);
    },
    retry: 1,
    retryDelay: 1000,
    ...options,
  });
};

/**
 * Generic mutation hook with optimistic updates
 */
export const useGenericMutationWithOptimisticUpdate = <TData, TVariables, TError = Error>(
  mutationFn: (data: TVariables) => Promise<TData>,
  queryKey: readonly string[],
  optimisticUpdateFn: (oldData: any, variables: TVariables) => any,
  options?: MutationOptions<TData, TVariables> & Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old: any) => 
        optimisticUpdateFn(old, variables)
      );

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (error: TError, variables: TVariables, context: any) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      
      // Call custom onError if provided
      options?.onError?.(error as any, variables);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: (data, variables) => {
      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables);
    },
    retry: 1,
    retryDelay: 1000,
    ...options,
  });
};

/**
 * Generic mutation hook for file uploads
 */
export const useGenericUploadMutation = <TData, TVariables, TError = Error>(
  mutationFn: (data: TVariables) => Promise<TData>,
  queryKey: readonly string[],
  options?: MutationOptions<TData, TVariables> & Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey });
      
      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables);
    },
    onError: (error: TError, variables: TVariables) => {
      // Call custom onError if provided
      options?.onError?.(error as any, variables);
    },
    retry: 0, // Don't retry file uploads
    ...options,
  });
};