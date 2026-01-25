'use client';

import AccountInfoCard from '@/components/module/ledger/AccountInfoCard';
import EmptyState from '@/components/module/ledger/EmptyState';
import LedgerFilterForm from '@/components/module/ledger/LedgerFilterForm';
import DataTable from '@/components/ui/DataTable';
import Stack from '@/components/ui/Stack';
import { LEDGER_FILTER_FORM_DEFAULT_VALUES } from '@/constants/ledger';
import useBookDetail from '@/hooks/common/useBookDetail';
import useLedgerQuery from '@/hooks/module/ledger/query/useLedgerQuery';
import { LedgerEntry } from '@/types/api/report';
import { LedgerFilterFormData } from '@/types/client/report';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

const LedgerDataTable = () => {
  const t = useTranslations('ledger');
  const { book } = useBookDetail();
  const [filterData, setFilterData] = useState<LedgerFilterFormData>(LEDGER_FILTER_FORM_DEFAULT_VALUES);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const queryParams = useMemo(
    () => ({
      book_id: book?.id || '',
      account_id: filterData.accountId,
      start_date: filterData.startDate,
      end_date: filterData.endDate,
    }),
    [book?.id, filterData]
  );

  const { ledger, ledgerLoading } = useLedgerQuery(queryParams, isFilterApplied);

  const handleFilterChange = (data: LedgerFilterFormData) => {
    setFilterData(data);
    setIsFilterApplied(true);
  };

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numValue);
  };

  const columns = useMemo<ColumnDef<LedgerEntry>[]>(
    () => [
      {
        accessorKey: 'date',
        header: t('table.column.date'),
        cell: ({ row }) => {
          const date = row.getValue('date') as string;
          return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        },
      },
      {
        accessorKey: 'description',
        header: t('table.column.description'),
      },
      {
        accessorKey: 'ref',
        header: t('table.column.ref'),
      },
      {
        accessorKey: 'debit',
        header: t('table.column.debit'),
        cell: ({ row }) => {
          const debit = row.getValue('debit') as string;
          const debitValue = parseFloat(debit);
          return debitValue > 0 ? formatCurrency(debitValue) : '-';
        },
      },
      {
        accessorKey: 'credit',
        header: t('table.column.credit'),
        cell: ({ row }) => {
          const credit = row.getValue('credit') as string;
          const creditValue = parseFloat(credit);
          return creditValue > 0 ? formatCurrency(creditValue) : '-';
        },
      },
      {
        accessorKey: 'balance',
        header: t('table.column.balance'),
        cell: ({ row }) => {
          const balance = row.getValue('balance') as string;
          return formatCurrency(parseFloat(balance));
        },
      },
    ],
    [t]
  );

  return (
    <Stack direction="column" gap={4}>
      <LedgerFilterForm onFilterChange={handleFilterChange} />

      {!isFilterApplied ? (
        <EmptyState />
      ) : (
        <>
          {ledger && <AccountInfoCard ledger={ledger} />}

          {/* Entries Table */}
          <DataTable
            columns={columns}
            data={ledger?.entries || []}
            emptyState={t('table.empty')}
            isLoading={ledgerLoading}
            enablePagination
          />
        </>
      )}
    </Stack>
  );
};

export default LedgerDataTable;
