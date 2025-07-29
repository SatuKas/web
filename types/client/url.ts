export enum BookRoutePathType {
  BOOK_DASHBOARD = 'bookDashboardPath',
  BOOK_COA = 'bookCoaPath',
  BOOK_TRANSACTION = 'bookTransactionPath',
  BOOK_REPORT_JOURNAL = 'bookReportJournalPath',
  BOOK_REPORT_LEDGER = 'bookReportLedgerPath',
  BOOK_REPORT_BALANCE_SHEET = 'bookReportBalanceSheetPath',
  BOOK_SETTINGS = 'bookSettingsPath',
}

export type BookRouteUrl = Record<BookRoutePathType, string>;
