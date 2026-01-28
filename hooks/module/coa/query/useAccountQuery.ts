'use client';

import { useQuery } from '@/libs/react-query';
import { coaService } from '@/services/api';
import { AccountListData } from '@/types/client/coa';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useMemo } from 'react';

const ACCOUNT_LIST_QUERY_KEY = 'account-list';

const useAccountQuery = (bookId?: string) => {
  const {
    data: accountListData,
    isLoading: accountListLoading,
    refetch: refetchAccountList,
    pagination: accountListPagination,
    setPagination: setAccountListPagination,
    paginationResponse: accountListPaginationResponse,
  } = useQuery({
    queryKey: [ACCOUNT_LIST_QUERY_KEY, bookId],
    queryFn: ({ paginationParam }) =>
      coaService.getAccountsPaginatedByBookId({ book_id: bookId || '', ...paginationParam }),
    enabled: !!bookId,
  });

  const accountList = useMemo(() => {
    if (accountListData) {
      return accountListData.map((account) => mapSnakeCaseToCamelCase(account) as AccountListData);
    }
    return [];
  }, [accountListData]);

  return {
    accountList,
    accountListLoading,
    refetchAccountList,
    accountListPagination,
    setAccountListPagination,
    accountListPaginationResponse,
  };
};

export default useAccountQuery;
