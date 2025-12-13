'use client';

import { ledgerService } from '@/services/api';
import { LedgerQueryParams, LedgerResponse } from '@/types/api/report';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const LEDGER_QUERY_KEY = 'ledger-report';

const useLedgerQuery = (params: LedgerQueryParams, enabled: boolean = false) => {
  const {
    data: ledgerData,
    isLoading: ledgerLoading,
    refetch: refetchLedger,
  } = useQuery({
    queryKey: [LEDGER_QUERY_KEY, params],
    queryFn: () => ledgerService.getLedgerReport(params),
    enabled: enabled && !!params.book_id,
  });

  const ledger = useMemo(() => {
    if (ledgerData) {
      return mapSnakeCaseToCamelCase(ledgerData) as LedgerResponse;
    }
    return null;
  }, [ledgerData]);

  return { ledger, ledgerLoading, refetchLedger };
};

export default useLedgerQuery;
