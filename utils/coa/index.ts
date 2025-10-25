import { ACCOUNT_TYPE_MAP } from '@/constants/coa';
import { AccountType } from '@/types/client/coa';

export const getAccountCategoryByType = (type: AccountType) => {
  return ACCOUNT_TYPE_MAP[type].category;
};

export const getAccountPositionByType = (type: AccountType) => {
  return ACCOUNT_TYPE_MAP[type].position;
};
