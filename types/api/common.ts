/**
 * Enum for API versioning.
 */
export enum ApiVersion {
  V1 = 'v1', // version 1 of the API
}

export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Enum for standard exception/error codes used in API responses.
 */
export enum ExceptionCode {
  // System unhandled error
  INTERNAL_SERVER_ERROR = 'SYS00',

  // Database error
  DATABASE_CONNECTION_ERROR = 'DB00',

  // Authentication/Authorization Error
  UNAUTHORIZED_USER = 'AUT00',
  FORBIDDEN_ACCESS = 'AUT01',
  INVALID_CREDENTIALS = 'AUT02',
  INVALID_TOKEN = 'AUT03',
  EXPIRED_TOKEN = 'AUT04',
  REVOKED_TOKEN = 'AUT05',
  TOKEN_NOT_FOUND = 'AUT06',
  INVALID_TOKEN_TYPE = 'AUT07',

  // Request Error
  INVALID_REQUEST = 'REQ00',
  MISSING_REQUIRED_FIELDS = 'REQ01',
  INVALID_PARAMETERS = 'REQ02',
  INVALID_QUERY_PARAMETERS = 'REQ03',
  INVALID_PATH_PARAMETERS = 'REQ05',
  INVALID_HEADER_PARAMETERS = 'REQ06',
  TOO_MANY_REQUESTS = 'REQ07',
  UNPROCESSABLE_ENTITY = 'REQ08',

  // Data Error
  DATA_NOT_FOUND = 'DAT00',
  DATA_ALREADY_EXISTS = 'DAT01',

  // External Error
  EXTERNAL_CONNECTION_ERROR = 'EXT00',
  EXTERNAL_SERVICE_UNAVAILABLE = 'EXT01',
  EXTERNAL_SERVICE_TIMEOUT = 'EXT02',
  EXTERNAL_SERVICE_ERROR = 'EXT03',
  EXTERNAL_SERVICE_UNAUTHORIZED = 'EXT04',
  EXTERNAL_SERVICE_FORBIDDEN = 'EXT05',
  EXTERNAL_SERVICE_NOT_FOUND = 'EXT06',
  EXTERNAL_SERVICE_INVALID_REQUEST = 'EXT07',
}

/**
 * Standard structure for successful API response data.
 * @template T - the type of the data returned
 */
export interface ResponseData<T> {
  data: T; // actual response data
  message: string | null; // optional message, can be null if not needed
}

export interface ExtraDataResponse {
  limit?: number;
  page?: number;
  total?: number;
  total_pages?: number;
  next_page?: number;
  prev_page?: number;
}

/**
 * Structure for error details in API responses.
 */
export interface ResponseError {
  details?: Array<Record<string, any>>; // optional array of error details, e.g. validation errors
}

/**
 * General API response structure, used for both success and error responses.
 * @template T - the type of the data returned
 */
export interface ApiResponse<T> extends ResponseData<T> {
  status: ResponseStatus; // indicates if the response is success or error
  code: ExceptionCode; // error code from ExceptionCode enum
  error?: ResponseError; // error object, present only if status is 'error'
  timestamp?: string; // optional ISO timestamp when the response was generated
  path?: string; // optional API endpoint path for debugging/tracing
  extra_data?: ExtraDataResponse;
}
