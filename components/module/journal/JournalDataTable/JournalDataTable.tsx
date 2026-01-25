'use client';

import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/DataTable';
import useBookDetail from '@/hooks/common/useBookDetail';
import useJournalQuery from '@/hooks/module/journal/query/useJournalQuery';
import { JournalEntry, JournalListData } from '@/types/client/report';
import { formatCurrency } from '@/utils/number';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/**
 * Represents the data structure for a row in the Journal table.
 * It can be either a top-level journal summary or a detailed sub-row entry.
 */
type TableRowData =
  | (JournalListData & { _isSubRow?: false; subRows?: TableRowData[] })
  | (JournalEntry & { _isSubRow: true });

/**
 * JournalDataTable component displays journal entries in a hierarchical table format.
 * Top-level rows show journal metadata (date, description, total),
 * while expandable sub-rows show specific account debits and credits.
 */
const JournalDataTable = () => {
  const t = useTranslations('journal');
  const { book } = useBookDetail();

  const { journalList, pagination, setPagination, paginationResponse, journalLoading } = useJournalQuery(
    { book_id: book?.id || '' },
    !!book?.id
  );

  /**
   * Transforms the journal list into a format compatible with the DataTable's expansion feature.
   * Each journal entry is mapped to `subRows` and tagged with `_isSubRow: true`.
   */
  const tableData = useMemo<TableRowData[]>(
    () =>
      journalList.map((j) => ({
        ...j,
        subRows: j.entries.map((e) => ({ ...e, _isSubRow: true })),
      })),
    [journalList]
  );

  const columns = useMemo<ColumnDef<TableRowData>[]>(() => {
    /**
     * Type guard to check if the current row data is a journal entry (sub-row).
     */
    const isEntry = (data: TableRowData): data is Extract<TableRowData, { _isSubRow: true }> => !!data._isSubRow;

    return [
      {
        id: 'expand',
        cell: ({ row }) =>
          !isEntry(row.original) &&
          row.getCanExpand() && (
            <Button variant="ghost" size="sm" onClick={() => row.toggleExpanded()} className="size-6 p-0">
              {row.getIsExpanded() ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            </Button>
          ),
        size: 40,
      },
      {
        header: t('table.column.date'),
        accessorKey: 'date',
        cell: ({ row, getValue }) =>
          !isEntry(row.original) &&
          new Date(getValue() as string).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
      },
      {
        header: t('table.column.description'),
        accessorKey: 'description',
        cell: ({ row, getValue }) => !isEntry(row.original) && (getValue() as string),
      },
      {
        id: 'account',
        header: t('table.column.account'),
        cell: ({ row }) =>
          isEntry(row.original) && (
            <div className="pl-8 flex flex-col">
              <span className="font-medium">{row.original.account.name}</span>
              <span className="text-sm text-muted-foreground">{row.original.account.code}</span>
            </div>
          ),
      },
      {
        id: 'debit',
        header: t('table.column.debit'),
        cell: ({ row }) => isEntry(row.original) && (row.original.debit ? formatCurrency(row.original.debit) : '-'),
      },
      {
        id: 'credit',
        header: t('table.column.credit'),
        cell: ({ row }) => isEntry(row.original) && (row.original.credit ? formatCurrency(row.original.credit) : '-'),
      },
      {
        header: t('table.column.total'),
        accessorKey: 'totalAmount',
        cell: ({ row, getValue }) => !isEntry(row.original) && formatCurrency(getValue() as string),
      },
    ];
  }, [t]);

  return (
    <DataTable
      columns={columns}
      data={tableData}
      isLoading={journalLoading}
      enablePagination
      manualPagination
      pageCount={paginationResponse?.totalPages}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
};

export default JournalDataTable;
