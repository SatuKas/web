'use client';

import { coaService } from '@/services/api';
import { AccountListData } from '@/types/client/coa';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const ACCOUNT_LIST_QUERY_KEY = 'account-list';

const useAccountQuery = (bookId?: string) => {
  const {
    data: accountListData,
    isLoading: accountListLoading,
    refetch: refetchAccountList,
  } = useQuery({
    queryKey: [ACCOUNT_LIST_QUERY_KEY],
    queryFn: () => coaService.getAccountsByBookId(bookId as string),
    enabled: !!bookId,
  });

  const accountList = useMemo(() => {
    if (accountListData) {
      return accountListData.map((account) => mapSnakeCaseToCamelCase(account) as AccountListData);
    }
    return [];
  }, [accountListData]);

  return { accountList, accountListLoading, refetchAccountList };
};

export default useAccountQuery;
