import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { COA_CREATE_PATH, COA_LIST_PATH } from '@/services/api/routes';
import { AccountResponse, CreateAccountPayload } from '@/types/api/coa';
import { ApiResponse } from '@/types/api/common';

/**
 * CoaService handles COA-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class CoaService extends BaseHttpClient {
  async getAccountsByBookId(bookId: string) {
    return this.get<ApiResponse<AccountResponse[]>>(COA_LIST_PATH, { params: { book_id: bookId } }).then(
      (res) => res.data
    );
  }

  async createAccount(payload: CreateAccountPayload) {
    return this.post<ApiResponse<AccountResponse>>(COA_CREATE_PATH, payload).then((res) => res.data);
  }

  // async deleteBook(bookId: string) {
  //   return this.delete<ApiResponse<null>>(replaceString(BOOK_DELETE_PATH, { ':bookId': bookId })).then(
  //     (res) => res.data
  //   );
  // }
}
