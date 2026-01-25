import { AccountPosition } from '@/types/client/coa';
import { PaginationQueryParams } from './common';

export interface LedgerAccount {
  id: string;
  code: string;
  name: string;
  position: AccountPosition;
}

export interface LedgerEntry {
  date: string;
  description: string;
  ref: string;
  debit: string;
  credit: string;
  balance: string;
}

export interface LedgerResponse {
  account: LedgerAccount;
  openingBalance: string;
  entries: LedgerEntry[];
  totalDebit: string;
  totalCredit: string;
  closingBalance: string;
}

export interface LedgerQueryParams {
  book_id: string;
  account_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface BalanceSheetAccount {
  code: string;
  name: string;
  balance: string;
}

export interface BalanceSheetAssets {
  currentAssets: BalanceSheetAccount[];
  fixedAssets: BalanceSheetAccount[];
  totalAssets: string;
}

export interface BalanceSheetLiabilities {
  currentLiabilities: BalanceSheetAccount[];
  totalLiabilities: string;
}

export interface BalanceSheetEquity {
  equityAccounts: BalanceSheetAccount[];
  totalEquity: string;
}

export interface BalanceSheetCheck {
  assets: string;
  liabilitiesPlusEquity: string;
  isBalanced: boolean;
}

export interface BalanceSheetResponse {
  date: string;
  assets: BalanceSheetAssets;
  liabilities: BalanceSheetLiabilities;
  equity: BalanceSheetEquity;
  check: BalanceSheetCheck;
}

export interface BalanceSheetQueryParams {
  book_id: string;
  date?: string;
}

export interface JournalResponse {
  id: string;
  date: string;
  description: string;
  total_amount: string;
  type: string;
  ref_type: string;
  ref_id: string;
  entries: {
    id: string;
    amount: string;
    account: {
      id: string;
      code: string;
      name: string;
    };
    debit: string | null;
    credit: string | null;
    position: number;
  }[];
}

export interface JournalQueryParams extends PaginationQueryParams {
  book_id: string;
}
