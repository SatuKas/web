'use client';

import BalanceSheetCard from '@/components/module/balanceSheet/BalanceSheetCard';
import BalanceSheetFilterForm from '@/components/module/balanceSheet/BalanceSheetFilterForm';
import EmptyState from '@/components/module/balanceSheet/EmptyState';
import Stack from '@/components/ui/Stack';
import { BALANCE_SHEET_FILTER_FORM_DEFAULT_VALUES } from '@/constants/balanceSheet';
import useBookDetail from '@/hooks/common/useBookDetail';
import useBalanceSheetQuery from '@/hooks/module/balanceSheet/query/useBalanceSheetQuery';
import { BalanceSheetFilterFormData } from '@/types/client/report';
import { useMemo, useState } from 'react';

const BalanceSheetDataTable = () => {
  const { book } = useBookDetail();
  const [filterData, setFilterData] = useState<BalanceSheetFilterFormData>(BALANCE_SHEET_FILTER_FORM_DEFAULT_VALUES);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const queryParams = useMemo(
    () => ({
      book_id: book?.id || '',
      date: filterData.date,
    }),
    [book?.id, filterData]
  );

  const { balanceSheet, balanceSheetLoading } = useBalanceSheetQuery(queryParams, isFilterApplied);

  const handleFilterChange = (data: BalanceSheetFilterFormData) => {
    setFilterData(data);
    setIsFilterApplied(true);
  };

  return (
    <Stack direction="column" gap={4}>
      <BalanceSheetFilterForm onFilterChange={handleFilterChange} />

      {!isFilterApplied ? (
        <EmptyState />
      ) : (
        <>{balanceSheet && <BalanceSheetCard balanceSheet={balanceSheet} isLoading={balanceSheetLoading} />}</>
      )}
    </Stack>
  );
};

export default BalanceSheetDataTable;
