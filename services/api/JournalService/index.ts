import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { REPORT_JOURNAL_PATH } from '@/services/api/routes';
import { ApiResponse } from '@/types/api/common';
import { JournalQueryParams, JournalResponse } from '@/types/api/report';

/**
 * JournalService handles journal report-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class JournalService extends BaseHttpClient {
  async getJournalReport(params: JournalQueryParams) {
    return this.get<ApiResponse<JournalResponse[]>>(REPORT_JOURNAL_PATH, { params }).then((res) => res);
  }
}
