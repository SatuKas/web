export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;
}

export interface ErrorDetails {
  details?: Array<Record<string, any>>;
}
