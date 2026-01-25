import { ApiResponse, PaginationQueryParams } from '@/types/api/common';
import { ErrorDetails, PaginationResponse } from '@/types/client/reactQuery';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import {
  QueryFunctionContext,
  UseQueryOptions,
  UseQueryResult,
  useQuery as useReactQuery,
} from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

type CustomQueryFnContext<TQueryKey extends readonly unknown[] = readonly unknown[]> =
  QueryFunctionContext<TQueryKey> & {
    paginationParam: PaginationQueryParams;
  };

type CustomQueryOptions<TData, TError, TQueryKey extends readonly unknown[] = readonly unknown[]> = Omit<
  UseQueryOptions<ApiResponse<TData>, TError, ApiResponse<TData>, TQueryKey>,
  'queryFn'
> & {
  queryFn: (context: CustomQueryFnContext<TQueryKey>) => Promise<ApiResponse<TData>>;
  initialPagination?: PaginationState;
};

/**
 * A custom wrapper around TanStack Query's useQuery hook that processes the ApiResponse.
 *
 * This hook manages pagination state, extracts the core data payload, transforms
 * snake_case pagination metadata into camelCase, and parses error details.
 *
 * @template TData - The expected type of the data payload.
 * @template TError - The type of the error object.
 * @template TQueryKey - The type of the query key.
 * @param options - Configuration options including standard TanStack Query options,
 *                  a custom query function that receives pagination parameters,
 *                  and an optional initial pagination state.
 * @returns The query result augmented with `data`, `pagination`, `paginationResponse`, `errorDetails`, and `setPagination`.
 */
export const useQuery = <TData, TError = unknown, TQueryKey extends readonly unknown[] = readonly unknown[]>(
  options: CustomQueryOptions<TData, TError, TQueryKey>
): Omit<UseQueryResult<ApiResponse<TData>, TError>, 'data'> & {
  pagination: PaginationState;
  paginationResponse: PaginationResponse | undefined;
  errorDetails: ErrorDetails | undefined;
  data: TData | undefined;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
} => {
  const { queryFn, initialPagination = { pageIndex: 0, pageSize: 10 }, ...restOptions } = options;

  const [pagination, setPagination] = useState<PaginationState>(initialPagination);

  const paginationParam = useMemo<PaginationQueryParams>(() => {
    return {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    };
  }, [pagination]);

  const query = useReactQuery<ApiResponse<TData>, TError, ApiResponse<TData>, any>({
    ...(restOptions as any),
    queryKey: [...(restOptions.queryKey as any), paginationParam],
    queryFn: (context: QueryFunctionContext<any>) =>
      queryFn({ ...context, paginationParam } as CustomQueryFnContext<TQueryKey>),
  });

  // Map snake_case pagination metadata (extra_data) to camelCase for client-side consistency
  const paginationResponse = query.data?.extra_data ? mapSnakeCaseToCamelCase(query.data.extra_data) : undefined;

  // Extract and transform error details if the API returned a structured error response
  const errorDetails = query.data?.error?.details ? mapSnakeCaseToCamelCase(query.data.error.details) : undefined;

  // Extract the primary data payload from the ApiResponse wrapper
  const data = query.data?.data ? query.data.data : undefined;

  return { ...query, pagination, paginationResponse, errorDetails, data, setPagination } as any;
};
