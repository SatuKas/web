/**
 * Enum for API versioning.
 */
export enum ApiVersion {
  V1 = 'v1', // version 1 of the API
}

/**
 * Enum for standard exception/error codes used in API responses.
 */
export enum ExceptionCode {
  UNAUTHORIZED = 'UNAUTHORIZED_USER', // user is not authenticated
  FORBIDDEN = 'FORBIDDEN_ACCESS', // user does not have permission
  NOT_FOUND = 'DATA_NOT_FOUND', // requested data is not found
  VALIDATION_FAILED = 'VALIDATION_FAILED', // input validation failed
  SERVER_ERROR = 'INTERNAL_SERVER_ERROR', // generic server error
  BAD_REQUEST = 'BAD_REQUEST', // request is malformed or invalid
  NETWORK_ERROR = 'NETWORK_ERROR', // network-related error
}

/**
 * Standard structure for successful API response data.
 * @template T - the type of the data returned
 */
export interface ResponseData<T> {
  data: T; // actual response data
  message: string | null; // optional message, can be null if not needed
}

/**
 * Structure for error details in API responses.
 */
export interface ResponseError {
  code: ExceptionCode; // error code from ExceptionCode enum
  details?: Array<Record<string, any>>; // optional array of error details, e.g. validation errors
}

/**
 * General API response structure, used for both success and error responses.
 * @template T - the type of the data returned
 */
export interface ApiResponse<T> extends ResponseData<T> {
  status: 'success' | 'error'; // indicates if the response is success or error
  error?: ResponseError; // error object, present only if status is 'error'
  timestamp?: string; // optional ISO timestamp when the response was generated
  path?: string; // optional API endpoint path for debugging/tracing
}
