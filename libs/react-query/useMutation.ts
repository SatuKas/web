import { ApiResponse } from '@/types/api/common';
import { ErrorDetails, PaginationResponse } from '@/types/client/reactQuery';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import {
  MutateOptions,
  UseMutationOptions,
  UseMutationResult,
  useMutation as useReactQuery,
} from '@tanstack/react-query';

/**
 * Custom mutation options that wrap TanStack Query's mutation options.
 * It expects the mutation function to return an ApiResponse<TData>,
 * but provides the unwrapped TData to lifecycle callbacks.
 */
export interface UseCustomMutationOptions<TData, TError = unknown, TVariables = unknown, TContext = unknown>
  extends Omit<UseMutationOptions<ApiResponse<TData>, TError, TVariables, TContext>, 'onSuccess' | 'onSettled'> {
  onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => void | Promise<unknown>;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined
  ) => void | Promise<unknown>;
}

/**
 * Custom options for the mutate and mutateAsync functions.
 */
export interface CustomMutateOptions<TData, TError = unknown, TVariables = unknown, TContext = unknown>
  extends Omit<MutateOptions<ApiResponse<TData>, TError, TVariables, TContext>, 'onSuccess' | 'onSettled'> {
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => void | Promise<unknown>;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined
  ) => void | Promise<unknown>;
}

/**
 * The result type returned by the custom useMutation hook.
 */
export type CustomUseMutationResult<TData, TError = unknown, TVariables = unknown, TContext = unknown> = Omit<
  UseMutationResult<ApiResponse<TData>, TError, TVariables, TContext>,
  'data' | 'mutate' | 'mutateAsync'
> & {
  pagination: PaginationResponse | undefined;
  errorDetails: ErrorDetails | undefined;
  data: TData | undefined;
  mutate: (variables: TVariables, options?: CustomMutateOptions<TData, TError, TVariables, TContext>) => void;
  mutateAsync: (
    variables: TVariables,
    options?: CustomMutateOptions<TData, TError, TVariables, TContext>
  ) => Promise<TData>;
};

/**
 * A custom wrapper around TanStack Query's useMutation hook that processes the ApiResponse.
 *
 * This hook extracts the core data, transforms snake_case pagination metadata
 * into camelCase, and parses error details from the response structure.
 * It also unwraps the ApiResponse in all callbacks and return values.
 *
 * @template TData - The expected type of the data payload.
 * @template TError - The type of the error object.
 * @template TVariables - The type of the variables passed to the mutation.
 * @template TContext - The type of the mutation context.
 * @param options - Custom mutation options.
 * @returns The mutation result augmented with `data`, `pagination`, and `errorDetails`.
 */
export const useMutation = <TData, TError = unknown, TVariables = unknown, TContext = unknown>(
  options: UseCustomMutationOptions<TData, TError, TVariables, TContext>
): CustomUseMutationResult<TData, TError, TVariables, TContext> => {
  const { onSuccess, onSettled, ...restOptions } = options;

  const mutation = useReactQuery<ApiResponse<TData>, TError, TVariables, TContext>({
    ...restOptions,
    onSuccess: (response, variables, context) => {
      onSuccess?.(response.data, variables, context);
    },
    onSettled: (response, error, variables, context) => {
      onSettled?.(response?.data, error, variables, context);
    },
  });

  // Map snake_case pagination metadata (extra_data) to camelCase for client-side consistency
  const pagination = mutation.data?.extra_data ? mapSnakeCaseToCamelCase(mutation.data.extra_data) : undefined;

  // Extract and transform error details if the API returned a structured error response
  // This could come from the successful response (if status is error) or the error object
  const errorData = (mutation.data || (mutation.error as ApiResponse<any>))?.error;
  const errorDetails = errorData?.details ? mapSnakeCaseToCamelCase(errorData.details) : undefined;

  // Extract the primary data payload from the ApiResponse wrapper
  const data = mutation.data?.data ? mutation.data.data : undefined;

  // Wrap mutate function to handle ApiResponse unwrapping in its options
  const mutate = (variables: TVariables, mutateOptions?: CustomMutateOptions<TData, TError, TVariables, TContext>) => {
    const { onSuccess: customOnSuccess, onSettled: customOnSettled, ...restMutateOptions } = mutateOptions || {};

    return mutation.mutate(variables, {
      ...restMutateOptions,
      onSuccess: (response, vars, ctx) => {
        customOnSuccess?.(response.data, vars, ctx);
      },
      onSettled: (response, err, vars, ctx) => {
        customOnSettled?.(response?.data, err, vars, ctx);
      },
    });
  };

  // Wrap mutateAsync function to handle ApiResponse unwrapping in its options and return value
  const mutateAsync = async (
    variables: TVariables,
    mutateOptions?: CustomMutateOptions<TData, TError, TVariables, TContext>
  ): Promise<TData> => {
    const { onSuccess: customOnSuccess, onSettled: customOnSettled, ...restMutateOptions } = mutateOptions || {};

    const response = await mutation.mutateAsync(variables, {
      ...restMutateOptions,
      onSuccess: (res, vars, ctx) => {
        customOnSuccess?.(res.data, vars, ctx);
      },
      onSettled: (res, err, vars, ctx) => {
        customOnSettled?.(res?.data, err, vars, ctx);
      },
    });

    return response.data;
  };

  return {
    ...mutation,
    pagination,
    errorDetails,
    data,
    mutate,
    mutateAsync,
  };
};
