'use client';

import DataTable from '@/components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

type CoaData = {
  id: string;
  code: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  balance: number;
  isActive: boolean;
};

const columns: ColumnDef<CoaData>[] = [
  {
    accessorKey: 'code',
    header: 'Kode',
  },
  {
    accessorKey: 'name',
    header: 'Nama Akun',
  },
  {
    accessorKey: 'type',
    header: 'Tipe',
  },
  {
    accessorKey: 'balance',
    header: 'Saldo',
    cell: ({ row }) => {
      const balance = row.getValue('balance') as number;
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(balance);
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return isActive ? 'Aktif' : 'Non-aktif';
    },
  },
];

const dummyData: CoaData[] = [
  {
    id: '1',
    code: '1-1000',
    name: 'Kas',
    type: 'ASSET',
    balance: 10000000,
    isActive: true,
  },
  {
    id: '2',
    code: '1-2000',
    name: 'Bank BCA',
    type: 'ASSET',
    balance: 25000000,
    isActive: true,
  },
  {
    id: '3',
    code: '2-1000',
    name: 'Hutang Usaha',
    type: 'LIABILITY',
    balance: 5000000,
    isActive: true,
  },
  {
    id: '4',
    code: '3-1000',
    name: 'Modal Usaha',
    type: 'EQUITY',
    balance: 100000000,
    isActive: true,
  },
  {
    id: '5',
    code: '4-1000',
    name: 'Pendapatan Jasa',
    type: 'REVENUE',
    balance: 30000000,
    isActive: true,
  },
  {
    id: '6',
    code: '5-1000',
    name: 'Beban Operasional',
    type: 'EXPENSE',
    balance: 8000000,
    isActive: false,
  },
];

const CoaDataTable = () => {
  return <DataTable columns={columns} data={dummyData} />;
};

export default CoaDataTable;
