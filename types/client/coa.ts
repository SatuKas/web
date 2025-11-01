export type AddAccountData = {
  name: string;
  code: string;
  type: AccountType;
  balance?: number;
  parentAccount?: string;
  category: AccountCategory;
  description?: string;
  isParentGroup?: boolean;
};

export type EditAccountData = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export enum AccountCategory {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum AccountType {
  // Asset Types
  CRAS = 'CRAS', // Current Asset
  FXAS = 'FXAS', // Fixed Asset
  INAS = 'INAS', // Intangible Asset
  IVAS = 'IVAS', // Investment Asset
  OTAS = 'OTAS', // Other Asset

  // Liability Types
  CRLI = 'CRLI', // Current Liability
  LTLI = 'LTLI', // Long Term Liability
  OTLI = 'OTLI', // Other Liability

  // Equity Types
  CAPT = 'CAPT', // Capital
  RTER = 'RTER', // Retained Earnings
  DRAW = 'DRAW', // Drawings
  RESV = 'RESV', // Reserves

  // Income Types
  OPIN = 'OPIN', // Operating Income
  NOIN = 'NOIN', // Non Operating Income
  OTIN = 'OTIN', // Other Income

  // Expense Types
  COGS = 'COGS', // Cost of Goods Sold
  OPEX = 'OPEX', // Operating Expense
  FIEX = 'FIEX', // Financial Expense
  TAXE = 'TAXE', // Tax Expense
  OTEX = 'OTEX', // Other Expense
}

export enum AccountPosition {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export interface AccountListData {
  id: string;
  name: string;
  code: string;
  type: AccountType;
  category: AccountCategory;
  isActive: boolean;
  parentId: string;
  description: string;
  isParentGroup: boolean;
  level: number;
  currency: string;
  position: AccountPosition;
}
