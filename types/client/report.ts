import { AccountPosition } from './coa';

export interface LedgerFilterFormData {
  accountId?: string;
  startDate?: string;
  endDate?: string;
}

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

export interface LedgerData {
  account: LedgerAccount;
  openingBalance: string;
  entries: LedgerEntry[];
  totalDebit: string;
  totalCredit: string;
  closingBalance: string;
}

export interface BalanceSheetFilterFormData {
  date?: string;
}

export interface JournalAccount {
  id: string;
  code: string;
  name: string;
}

export interface JournalEntry {
  id: string;
  amount: string;
  account: JournalAccount;
  debit: string | null;
  credit: string | null;
  position: number;
}

export interface JournalListData {
  id: string;
  date: string;
  description: string;
  total_amount: string;
  type: string;
  ref_type: string;
  ref_id: string;
  entries: JournalEntry[];
}
