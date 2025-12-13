import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { REPORT_LEDGER_PATH } from '@/services/api/routes';
import { ApiResponse } from '@/types/api/common';
import { LedgerQueryParams, LedgerResponse } from '@/types/api/report';

/**
 * LedgerService handles ledger report-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class LedgerService extends BaseHttpClient {
  async getLedgerReport(params: LedgerQueryParams) {
    return this.get<ApiResponse<LedgerResponse>>(REPORT_LEDGER_PATH, { params }).then((res) => res.data);
  }
}
