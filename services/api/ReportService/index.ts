import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { REPORT_BALANCE_SHEET_PATH, REPORT_LEDGER_PATH } from '@/services/api/routes';
import { ApiResponse } from '@/types/api/common';
import { BalanceSheetQueryParams, BalanceSheetResponse, LedgerQueryParams, LedgerResponse } from '@/types/api/report';

/**
 * ReportService handles report-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class ReportService extends BaseHttpClient {
  async getLedgerReport(params: LedgerQueryParams) {
    return this.get<ApiResponse<LedgerResponse>>(REPORT_LEDGER_PATH, { params }).then((res) => res.data);
  }

  async getBalanceSheetReport(params: BalanceSheetQueryParams) {
    return this.get<ApiResponse<BalanceSheetResponse>>(REPORT_BALANCE_SHEET_PATH, { params }).then((res) => res);
  }
}
