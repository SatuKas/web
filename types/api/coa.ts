import { AccountCategory, AccountPosition, AccountType } from '../client/coa';

export interface AccountResponse {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  is_parent_group: boolean;
  level: number;
  currency: string;
  position: AccountPosition;
  type: AccountType;
  category: AccountCategory;
  parent_id?: string;
}

export interface CreateAccountPayload {
  book_id: string;
  name: string;
  description?: string;
  code: string;
  type: AccountType;
  balance?: number;
  parent_id?: string;
  category?: AccountCategory;
  is_parent_group?: boolean;
  position?: AccountPosition;
}

export interface UpdateAccountPayload {
  id: string;
  book_id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}
