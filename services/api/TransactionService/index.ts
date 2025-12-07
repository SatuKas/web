import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { TRANSACTION_ENTRY_PATH } from '@/services/api/routes';
import { ApiResponse } from '@/types/api/common';
import { CreateTransactionPayload, TransactionResponse } from '@/types/api/transaction';

/**
 * TransactionService handles transaction-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class TransactionService extends BaseHttpClient {
  async createTransactionEntry(payload: CreateTransactionPayload) {
    return this.post<ApiResponse<TransactionResponse>>(TRANSACTION_ENTRY_PATH, payload).then((res) => res.data);
  }
}
