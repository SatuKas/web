'use client';

import { useQuery } from '@/libs/react-query';
import { reportService } from '@/services/api';
import { LedgerQueryParams } from '@/types/api/report';
import { LedgerData } from '@/types/client/report';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useMemo } from 'react';

const LEDGER_QUERY_KEY = 'ledger-report';

const useLedgerQuery = (params: LedgerQueryParams, enabled: boolean = false) => {
  const {
    data: ledgerData,
    isLoading: ledgerLoading,
    refetch: refetchLedger,
  } = useQuery({
    queryKey: [LEDGER_QUERY_KEY, params],
    queryFn: () => reportService.getLedgerReport(params),
    enabled: enabled && !!params.book_id,
  });

  const ledger = useMemo(() => {
    if (ledgerData) {
      return mapSnakeCaseToCamelCase(ledgerData) as LedgerData;
    }
    return null;
  }, [ledgerData]);

  return { ledger, ledgerLoading, refetchLedger };
};

export default useLedgerQuery;
