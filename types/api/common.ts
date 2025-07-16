export enum ApiVersion {
  V1 = 'v1',
}

export enum ExceptionCode {
  UNAUTHORIZED = 'UNAUTHORIZED_USER',
  FORBIDDEN = 'FORBIDDEN_ACCESS',
  NOT_FOUND = 'DATA_NOT_FOUND',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

export interface ResponseData<T> {
  data: T;
  message: string | null;
}

export interface ResponseError {
  code: ExceptionCode;
  details?: Array<Record<string, any>>;
}

export interface ApiResponse<T> extends ResponseData<T> {
  status: 'success' | 'error';
  error?: ResponseError;
  timestamp?: string;
  path?: string;
}
