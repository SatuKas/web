export enum JournalType {
  GENERAL = 'GENERAL',
  ADJUSTMENT = 'ADJUSTMENT',
  REVERSAL = 'REVERSAL',
  CORRECTION = 'CORRECTION',
  CLOSING = 'CLOSING',
  OPENING = 'OPENING',
  RECONCILIATION = 'RECONCILIATION',
}

export enum BookModule {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
  SAVING = 'SAVING',
  INVESTMENT = 'INVESTMENT',
  DEBT = 'DEBT',
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  PROCUREMENT = 'PROCUREMENT',
  RECEIPT = 'RECEIPT',
  PAYMENT = 'PAYMENT',
  RECONCILIATION = 'RECONCILIATION',
  PURCHASING = 'PURCHASING',
  INVENTORY = 'INVENTORY',
  SALES = 'SALES',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  EMPLOYEE = 'EMPLOYEE',
}

export interface TransactionEntry {
  account_id: string;
  position: number;
  debit: number | null;
  credit: number | null;
}

export interface CreateTransactionPayload {
  book_id: string;
  description: string;
  date: string;
  type: JournalType;
  ref_type: BookModule;
  entries: TransactionEntry[];
}

export interface TransactionResponse {
  id: string;
  book_id: string;
  description: string;
  date: string;
  type: JournalType;
  ref_type: BookModule;
  entries: TransactionEntry[];
  created_at: string;
  updated_at: string;
}
