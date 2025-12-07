import { BookModule, JournalType } from '@/types/api/transaction';
import { AccountPosition } from '@/types/client/coa';
import { TransactionFormData } from '@/types/client/transaction';

export const CREATE_TRANSACTION_FORM_DEFAULT_VALUES: TransactionFormData = {
  description: '',
  date: new Date().toISOString().split('T')[0],
  type: JournalType.GENERAL,
  refType: BookModule.EXPENSE,
  entries: [
    {
      accountId: '',
      position: 1,
      amount: null,
      accountPosition: AccountPosition.DEBIT,
    },
    {
      accountId: '',
      position: 2,
      amount: null,
      accountPosition: AccountPosition.CREDIT,
    },
  ],
};
