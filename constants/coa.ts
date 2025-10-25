import { AccountCategory, AccountPosition, AccountType, AddAccountData } from '@/types/client/coa';

export const ADD_ACCOUNT_FORM_DEFAULT_VALUES: AddAccountData = {
  name: '',
  code: '',
  type: AccountType.CRAS,
  balance: undefined,
  parentAccount: undefined,
  category: AccountCategory.ASSET,
  description: undefined,
  isParentGroup: false,
};

export const ACCOUNT_ASSET_TYPES = [
  AccountType.CRAS,
  AccountType.FXAS,
  AccountType.INAS,
  AccountType.IVAS,
  AccountType.OTAS,
];

export const ACCOUNT_LIABILITY_TYPES = [AccountType.CRLI, AccountType.LTLI, AccountType.OTLI];

export const ACCOUNT_EQUITY_TYPES = [AccountType.CAPT, AccountType.RTER, AccountType.DRAW, AccountType.RESV];

export const ACCOUNT_INCOME_TYPES = [AccountType.OPIN, AccountType.NOIN, AccountType.OTIN];

export const ACCOUNT_EXPENSE_TYPES = [
  AccountType.COGS,
  AccountType.OPEX,
  AccountType.FIEX,
  AccountType.TAXE,
  AccountType.OTEX,
];

export const ACCOUNT_TYPE_MAP: Record<AccountType, { category: AccountCategory; position: AccountPosition }> = {
  // ASSET
  CRAS: { category: AccountCategory.ASSET, position: AccountPosition.DEBIT },
  FXAS: { category: AccountCategory.ASSET, position: AccountPosition.DEBIT },
  INAS: { category: AccountCategory.ASSET, position: AccountPosition.DEBIT },
  IVAS: { category: AccountCategory.ASSET, position: AccountPosition.DEBIT },
  OTAS: { category: AccountCategory.ASSET, position: AccountPosition.DEBIT },

  // LIABILITY
  CRLI: { category: AccountCategory.LIABILITY, position: AccountPosition.CREDIT },
  LTLI: { category: AccountCategory.LIABILITY, position: AccountPosition.CREDIT },
  OTLI: { category: AccountCategory.LIABILITY, position: AccountPosition.CREDIT },

  // EQUITY
  CAPT: { category: AccountCategory.EQUITY, position: AccountPosition.CREDIT },
  RTER: { category: AccountCategory.EQUITY, position: AccountPosition.CREDIT },
  DRAW: { category: AccountCategory.EQUITY, position: AccountPosition.DEBIT },
  RESV: { category: AccountCategory.EQUITY, position: AccountPosition.CREDIT },

  // INCOME
  OPIN: { category: AccountCategory.INCOME, position: AccountPosition.CREDIT },
  NOIN: { category: AccountCategory.INCOME, position: AccountPosition.CREDIT },
  OTIN: { category: AccountCategory.INCOME, position: AccountPosition.CREDIT },

  // EXPENSE
  COGS: { category: AccountCategory.EXPENSE, position: AccountPosition.DEBIT },
  OPEX: { category: AccountCategory.EXPENSE, position: AccountPosition.DEBIT },
  FIEX: { category: AccountCategory.EXPENSE, position: AccountPosition.DEBIT },
  TAXE: { category: AccountCategory.EXPENSE, position: AccountPosition.DEBIT },
  OTEX: { category: AccountCategory.EXPENSE, position: AccountPosition.DEBIT },
};
