import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import {
  BOOK_CREATE_PATH,
  BOOK_DELETE_PATH,
  BOOK_GET_BY_ID_PATH,
  BOOK_LIST_PATH,
  BOOK_SHARED_LIST_PATH,
} from '@/services/api/routes';
import { BookResponse, CreateBookPayload } from '@/types/api/book';
import { ApiResponse } from '@/types/api/common';
import { replaceString } from '@/utils/string';

/**
 * BookService handles book-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class BookService extends BaseHttpClient {
  async getBooks() {
    return this.get<ApiResponse<BookResponse>>(BOOK_LIST_PATH).then((res) => res.data);
  }

  async getSharedBooks() {
    return this.get<ApiResponse<BookResponse>>(BOOK_SHARED_LIST_PATH).then((res) => res.data);
  }

  async getBookById(bookId: string) {
    return this.get<ApiResponse<BookResponse>>(replaceString(BOOK_GET_BY_ID_PATH, { ':bookId': bookId })).then(
      (res) => res.data
    );
  }

  async createBook(payload: CreateBookPayload) {
    return this.post<ApiResponse<BookResponse>>(BOOK_CREATE_PATH, payload).then((res) => res.data);
  }

  async deleteBook(bookId: string) {
    return this.delete<ApiResponse<null>>(replaceString(BOOK_DELETE_PATH, { ':bookId': bookId })).then(
      (res) => res.data
    );
  }
}
