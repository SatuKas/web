'use client';

import { useQuery } from '@/libs/react-query';
import { reportService } from '@/services/api';
import { BalanceSheetQueryParams, BalanceSheetResponse } from '@/types/api/report';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useMemo } from 'react';

const BALANCE_SHEET_QUERY_KEY = 'balance-sheet-report';

const useBalanceSheetQuery = (params: BalanceSheetQueryParams, enabled: boolean = false) => {
  const {
    data: balanceSheetData,
    isLoading: balanceSheetLoading,
    refetch: refetchBalanceSheet,
  } = useQuery({
    queryKey: [BALANCE_SHEET_QUERY_KEY, params],
    queryFn: () => reportService.getBalanceSheetReport(params),
    enabled: enabled && !!params.book_id,
  });

  const balanceSheet = useMemo(() => {
    if (balanceSheetData) {
      return mapSnakeCaseToCamelCase(balanceSheetData) as BalanceSheetResponse;
    }
    return null;
  }, [balanceSheetData]);

  return { balanceSheet, balanceSheetLoading, refetchBalanceSheet };
};

export default useBalanceSheetQuery;
