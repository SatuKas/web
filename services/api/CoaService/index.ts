import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { COA_CREATE_PATH, COA_LIST_PATH, COA_PAGINATED_LIST_PATH, COA_UPDATE_PATH } from '@/services/api/routes';
import {
  AccountListPaginatedQueryParam,
  AccountResponse,
  CreateAccountPayload,
  UpdateAccountPayload,
} from '@/types/api/coa';
import { ApiResponse } from '@/types/api/common';
import { replaceString } from '@/utils/string';

/**
 * CoaService handles COA-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class CoaService extends BaseHttpClient {
  async getAccountsByBookId(bookId: string) {
    return this.get<ApiResponse<AccountResponse[]>>(COA_LIST_PATH, { params: { book_id: bookId } }).then((res) => res);
  }

  async getAccountsPaginatedByBookId(params: AccountListPaginatedQueryParam) {
    return this.get<ApiResponse<AccountResponse[]>>(COA_PAGINATED_LIST_PATH, { params }).then((res) => res);
  }

  async createAccount(payload: CreateAccountPayload) {
    return this.post<ApiResponse<AccountResponse>>(COA_CREATE_PATH, payload).then((res) => res);
  }

  async updateAccount(payload: UpdateAccountPayload) {
    const { id, ...rest } = payload;
    return this.put<ApiResponse<AccountResponse>>(replaceString(COA_UPDATE_PATH, { ':accountId': id }), rest).then(
      (res) => res
    );
  }

  // async deleteBook(bookId: string) {
  //   return this.delete<ApiResponse<null>>(replaceString(BOOK_DELETE_PATH, { ':bookId': bookId })).then(
  //     (res) => res.data
  //   );
  // }
}
