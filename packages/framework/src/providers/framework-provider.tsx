"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Framework Provider Props
 */
interface FrameworkProviderProps {
  children: ReactNode;
  queryClient?: QueryClient;
  enableDevtools?: boolean;
}

/**
 * Default Query Client configuration
 */
const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

/**
 * Framework Provider Component
 * 
 * This provider wraps your application with all necessary context providers
 * for the framework to work properly. It includes:
 * - React Query for data fetching and caching
 * - React Query Devtools for development
 * 
 * Usage:
 * ```tsx
 * import { FrameworkProvider } from "@workspace/framework/providers";
 * 
 * function App() {
 *   return (
 *     <FrameworkProvider>
 *       <YourApp />
 *     </FrameworkProvider>
 *   );
 * }
 * ```
 */
export const FrameworkProvider: React.FC<FrameworkProviderProps> = ({
  children,
  queryClient = defaultQueryClient,
  enableDevtools = process.env.NODE_ENV === "development",
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {enableDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

/**
 * Hook to get the Query Client instance
 * Useful for manual cache operations
 */
export const useQueryClient = () => {
  const { useQueryClient: useReactQueryClient } = require("@tanstack/react-query");
  return useReactQueryClient();
};

export default FrameworkProvider;
