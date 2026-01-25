import { ApiResponse } from '@/types/api/common';
import { ErrorDetails, PaginationResponse } from '@/types/client/reactQuery';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { UseMutationOptions, UseMutationResult, useMutation as useReactQuery } from '@tanstack/react-query';

/**
 * A custom wrapper around TanStack Query's useMutation hook that processes the ApiResponse.
 *
 * This hook extracts the core data, transforms snake_case pagination metadata
 * into camelCase, and parses error details from the response structure.
 *
 * @template TData - The expected type of the data payload.
 * @template TVariables - The type of the variables passed to the mutation.
 * @template TError - The type of the error object.
 * @param options - Standard TanStack Query mutation options.
 * @returns The mutation result augmented with `data`, `pagination`, and `errorDetails`.
 */
export const useMutate = <TData, TVariables = unknown, TError = unknown>(
  options: UseMutationOptions<ApiResponse<TData>, TError, TVariables>
): Omit<UseMutationResult<ApiResponse<TData>, TError, TVariables>, 'data'> & {
  pagination: PaginationResponse | undefined;
  errorDetails: ErrorDetails | undefined;
  data: TData | undefined;
} => {
  const mutation = useReactQuery(options);

  // Map snake_case pagination metadata (extra_data) to camelCase for client-side consistency
  const pagination = mutation.data?.extra_data ? mapSnakeCaseToCamelCase(mutation.data.extra_data) : undefined;

  // Extract and transform error details if the API returned a structured error response
  const errorDetails = mutation.data?.error?.details ? mapSnakeCaseToCamelCase(mutation.data.error.details) : undefined;

  // Extract the primary data payload from the ApiResponse wrapper
  const data = mutation.data?.data ? mutation.data.data : undefined;

  return { ...mutation, pagination, errorDetails, data };
};
