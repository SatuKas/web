'use client';

import AddAccount from '@/components/module/coa/AddAccount';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import useBookDetail from '@/hooks/common/useBookDetail';
import useAccountQuery from '@/hooks/module/coa/query/useAccountQuery';
import { AccountCategory, AccountListData, AccountPosition, AccountType } from '@/types/client/coa';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import EditAccount from '../EditAccount';
import EmptyData from './EmptyData/EmptyData';

const CoaDataTable = () => {
  const t = useTranslations('coa.table');
  const tCommon = useTranslations('common');
  const { book } = useBookDetail();

  const { accountList, accountListLoading, refetchAccountList } = useAccountQuery(book?.id);

  const columns = useMemo<ColumnDef<AccountListData>[]>(
    () => [
      {
        accessorKey: 'code',
        header: t('column.code'),
      },
      {
        accessorKey: 'name',
        header: t('column.name'),
      },
      {
        accessorKey: 'type',
        header: t('column.type'),
        cell: ({ row }) => {
          const type = row.getValue('type') as AccountType;
          return tCommon(`accountType.${type}`);
        },
      },
      {
        accessorKey: 'category',
        header: t('column.category'),
        cell: ({ row }) => {
          const category = row.getValue('category') as AccountCategory;
          return tCommon(`accountCategory.${category}`);
        },
      },
      {
        accessorKey: 'position',
        header: t('column.position'),
        cell: ({ row }) => {
          const position = row.getValue('position') as AccountPosition;
          return tCommon(`accountPosition.${position}`);
        },
      },
      // {
      //   accessorKey: 'balance',
      //   header: 'Saldo',
      //   cell: ({ row }) => {
      //     const balance = row.getValue('balance') as number;
      //     return new Intl.NumberFormat('id-ID', {
      //       style: 'currency',
      //       currency: 'IDR',
      //     }).format(balance);
      //   },
      // },
      {
        accessorKey: 'isActive',
        header: t('column.status'),
        cell: ({ row }) => {
          const isActive = row.getValue('isActive') as boolean;
          return (
            <Badge variant={isActive ? 'default' : 'destructive'}>
              {isActive ? tCommon('active') : tCommon('inactive')}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'action',
        header: t('column.action'),
        size: 100,
        cell: ({ row }) => {
          return <EditAccount accountData={row.original} onSuccess={refetchAccountList} />;
        },
      },
    ],
    [t, tCommon]
  );

  return (
    <Stack direction="column" gap={4}>
      <Stack direction="row" justify="between" align="center">
        <Input type="text" placeholder={t('placeholder.search')} />
        <AddAccount onSuccess={refetchAccountList} accountList={accountList} />
      </Stack>
      <DataTable
        columns={columns}
        data={accountList}
        emptyState={<EmptyData />}
        isLoading={accountListLoading}
        enablePagination
      />
    </Stack>
  );
};

export default CoaDataTable;
