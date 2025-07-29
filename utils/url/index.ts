import {
  BOOK_COA_PATH_URL,
  BOOK_DASHBOARD_PATH_URL,
  BOOK_REPORT_BALANCE_SHEET_PATH_URL,
  BOOK_REPORT_JOURNAL_PATH_URL,
  BOOK_REPORT_LEDGER_PATH_URL,
  BOOK_SETTINGS_PATH_URL,
  BOOK_TRANSACTION_PATH_URL,
} from '@/constants/routes';
import { BookRouteUrl } from '@/types/client/url';
import { replaceString } from '../string';

const replaceBookRouteUrl = (path: string, username: string, bookId: string) => {
  return replaceString(path, { ':username': username, ':bookId': bookId });
};

export const getBookRouteUrl = (username: string, bookId: string): BookRouteUrl => {
  const bookDashboardPath = replaceBookRouteUrl(BOOK_DASHBOARD_PATH_URL, username, bookId);
  const bookCoaPath = replaceBookRouteUrl(BOOK_COA_PATH_URL, username, bookId);
  const bookTransactionPath = replaceBookRouteUrl(BOOK_TRANSACTION_PATH_URL, username, bookId);
  const bookReportJournalPath = replaceBookRouteUrl(BOOK_REPORT_JOURNAL_PATH_URL, username, bookId);
  const bookReportLedgerPath = replaceBookRouteUrl(BOOK_REPORT_LEDGER_PATH_URL, username, bookId);
  const bookReportBalanceSheetPath = replaceBookRouteUrl(BOOK_REPORT_BALANCE_SHEET_PATH_URL, username, bookId);
  const bookSettingsPath = replaceBookRouteUrl(BOOK_SETTINGS_PATH_URL, username, bookId);

  return {
    bookDashboardPath,
    bookCoaPath,
    bookTransactionPath,
    bookReportJournalPath,
    bookReportLedgerPath,
    bookReportBalanceSheetPath,
    bookSettingsPath,
  };
};
