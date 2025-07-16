'use client';
import { toast } from '@/components/hoc/ToastProvider';
import { ApiResponse, ExceptionCode } from '@/types/api/common';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if ((error as unknown as ApiResponse<any>)?.error?.code === ExceptionCode.SERVER_ERROR) {
          toast.error(error.message);
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if ((error as unknown as ApiResponse<any>)?.error?.code === ExceptionCode.SERVER_ERROR) {
          toast.error(error.message);
        }
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
