import { AccountPosition } from '@/types/client/coa';

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
