'use client';

import AddAccount from '@/components/module/coa/AddAccount';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import useBookDetail from '@/hooks/common/useBookDetail';
import useAccountQuery from '@/hooks/module/coa/query/useAccountQuery';
import { AccountCategory, AccountListData, AccountType } from '@/types/client/coa';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import EmptyData from './EmptyData/EmptyData';

type CoaData = {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  category: AccountCategory;
  isActive: boolean;
};

const dummyData: CoaData[] = [
  {
    id: '1',
    code: '1-1000',
    name: 'Kas',
    type: AccountType.CRAS,
    category: AccountCategory.ASSET,
    isActive: true,
  },
  {
    id: '2',
    code: '1-2000',
    name: 'Bank BCA',
    type: AccountType.CRAS,
    category: AccountCategory.ASSET,
    isActive: true,
  },
  {
    id: '3',
    code: '2-1000',
    name: 'Hutang Usaha',
    type: AccountType.CRLI,
    category: AccountCategory.LIABILITY,
    isActive: true,
  },
  {
    id: '4',
    code: '3-1000',
    name: 'Modal Usaha',
    type: AccountType.CAPT,
    category: AccountCategory.EQUITY,
    isActive: true,
  },
  {
    id: '5',
    code: '4-1000',
    name: 'Pendapatan Jasa',
    type: AccountType.OPIN,
    category: AccountCategory.INCOME,
    isActive: true,
  },
  {
    id: '6',
    code: '5-1000',
    name: 'Beban Operasional',
    type: AccountType.OPEX,
    category: AccountCategory.EXPENSE,
    isActive: false,
  },
];

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
    ],
    [t, tCommon]
  );

  return (
    <Stack direction="column" gap={4}>
      <Stack direction="row" justify="between" align="center">
        <Input type="text" placeholder={t('placeholder.search')} />
        <AddAccount onSuccess={refetchAccountList} accountList={accountList} />
      </Stack>
      <DataTable columns={columns} data={accountList} emptyState={<EmptyData />} />
    </Stack>
  );
};

export default CoaDataTable;
