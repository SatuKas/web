import { BookModule, JournalType } from '@/types/api/transaction';
import { AccountPosition } from './coa';

export interface TransactionEntryData {
  accountId: string;
  position: number;
  accountPosition: AccountPosition;
  amount: number | null;
}

export interface TransactionFormData {
  description: string;
  date: string;
  type: JournalType;
  refType: BookModule;
  entries: TransactionEntryData[];
}
