'use client';
import { toast } from '@/components/hoc/ToastProvider';
import { ApiResponse, ExceptionCode } from '@/types/api/common';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

/**
 * QueryProvider is a React component that wraps its children with a QueryClientProvider from React Query.
 * This provider sets up a custom QueryClient with error handling for both queries and mutations.
 *
 * @param children - React children nodes that will have access to the QueryClient context
 */
function QueryProvider({ children }: PropsWithChildren) {
  // Create a new QueryClient instance with custom error handling and default options
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      // Handle errors globally for all queries
      onError: (error) => {
        // If the error code is INTERNAL_SERVER_ERROR, show a toast notification with the error message
        if ((error as unknown as ApiResponse<any>)?.code === ExceptionCode.INTERNAL_SERVER_ERROR) {
          toast.error(error.message);
        }
      },
    }),
    mutationCache: new MutationCache({
      // Handle errors globally for all mutations
      onError: (error) => {
        // If the error code is INTERNAL_SERVER_ERROR, show a toast notification with the error message
        if ((error as unknown as ApiResponse<any>)?.code === ExceptionCode.INTERNAL_SERVER_ERROR) {
          toast.error(error.message);
        }
      },
    }),
    defaultOptions: {
      queries: {
        // Prevent automatic refetching of queries when the window regains focus
        refetchOnWindowFocus: false,
      },
    },
  });

  // Provide the QueryClient context to all child components
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
