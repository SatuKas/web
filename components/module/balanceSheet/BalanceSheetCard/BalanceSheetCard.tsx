'use client';

import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import DataTable from '@/components/ui/DataTable';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { BalanceSheetResponse } from '@/types/api/report';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface BalanceSheetCardProps {
  balanceSheet: BalanceSheetResponse;
  isLoading: boolean;
}

const BalanceSheetCard = ({ balanceSheet, isLoading }: BalanceSheetCardProps) => {
  const t = useTranslations('balanceSheet');

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numValue);
  };

  const accountColumns = useMemo<ColumnDef<{ code: string; name: string; balance: string }>[]>(
    () => [
      {
        accessorKey: 'code',
        header: t('table.column.code'),
      },
      {
        accessorKey: 'name',
        header: t('table.column.name'),
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
    <Stack direction="column" gap={6}>
      {/* Assets Section */}
      <Card className="p-6">
        <Stack direction="column" gap={4}>
          <Typography variant="h4">{t('report.assets.title')}</Typography>

          {/* Current Assets */}
          <Stack direction="column" gap={2}>
            <Typography variant="h5" className="font-semibold">
              {t('report.assets.currentAssets')}
            </Typography>
            <DataTable
              columns={accountColumns}
              data={balanceSheet.assets.currentAssets}
              emptyState={t('table.empty')}
            />
          </Stack>

          {/* Fixed Assets */}
          <Stack direction="column" gap={2}>
            <Typography variant="h5" className="font-semibold">
              {t('report.assets.fixedAssets')}
            </Typography>
            <DataTable columns={accountColumns} data={balanceSheet.assets.fixedAssets} emptyState={t('table.empty')} />
          </Stack>

          {/* Total Assets */}
          <Stack direction="row" justify="between" align="center" className="border-t pt-4">
            <Typography variant="h5" className="font-semibold">
              {t('report.assets.totalAssets')}
            </Typography>
            <Typography variant="h5" className="font-semibold">
              {formatCurrency(parseFloat(balanceSheet.assets.totalAssets))}
            </Typography>
          </Stack>
        </Stack>
      </Card>

      {/* Liabilities Section */}
      <Card className="p-6">
        <Stack direction="column" gap={4}>
          <Typography variant="h4">{t('report.liabilities.title')}</Typography>

          {/* Current Liabilities */}
          <Stack direction="column" gap={2}>
            <Typography variant="h5" className="font-semibold">
              {t('report.liabilities.currentLiabilities')}
            </Typography>
            <DataTable
              columns={accountColumns}
              data={balanceSheet.liabilities.currentLiabilities}
              emptyState={t('table.empty')}
            />
          </Stack>

          {/* Total Liabilities */}
          <Stack direction="row" justify="between" align="center" className="border-t pt-4">
            <Typography variant="h5" className="font-semibold">
              {t('report.liabilities.totalLiabilities')}
            </Typography>
            <Typography variant="h5" className="font-semibold">
              {formatCurrency(parseFloat(balanceSheet.liabilities.totalLiabilities))}
            </Typography>
          </Stack>
        </Stack>
      </Card>

      {/* Equity Section */}
      <Card className="p-6">
        <Stack direction="column" gap={4}>
          <Typography variant="h4">{t('report.equity.title')}</Typography>

          {/* Equity Accounts */}
          <Stack direction="column" gap={2}>
            <Typography variant="h5" className="font-semibold">
              {t('report.equity.equityAccounts')}
            </Typography>
            <DataTable
              columns={accountColumns}
              data={balanceSheet.equity.equityAccounts}
              emptyState={t('table.empty')}
            />
          </Stack>

          {/* Total Equity */}
          <Stack direction="row" justify="between" align="center" className="border-t pt-4">
            <Typography variant="h5" className="font-semibold">
              {t('report.equity.totalEquity')}
            </Typography>
            <Typography variant="h5" className="font-semibold">
              {formatCurrency(parseFloat(balanceSheet.equity.totalEquity))}
            </Typography>
          </Stack>
        </Stack>
      </Card>

      {/* Check Section */}
      <Card className="p-6">
        <Stack direction="column" gap={4}>
          <Typography variant="h4">{t('report.check.title')}</Typography>
          <Stack direction="row" gap={6} className="flex-wrap">
            <Stack direction="column" gap={1}>
              <Typography variant="small" className="text-muted-foreground">
                {t('report.check.assets')}
              </Typography>
              <Typography variant="h5" className="font-semibold">
                {formatCurrency(parseFloat(balanceSheet.check.assets))}
              </Typography>
            </Stack>
            <Stack direction="column" gap={1}>
              <Typography variant="small" className="text-muted-foreground">
                {t('report.check.liabilitiesPlusEquity')}
              </Typography>
              <Typography variant="h5" className="font-semibold">
                {formatCurrency(parseFloat(balanceSheet.check.liabilitiesPlusEquity))}
              </Typography>
            </Stack>
            <Stack direction="column" gap={1}>
              <Typography variant="small" className="text-muted-foreground">
                {t('report.check.status')}
              </Typography>
              <Badge variant={balanceSheet.check.isBalanced ? 'default' : 'destructive'}>
                {balanceSheet.check.isBalanced ? t('report.check.balanced') : t('report.check.notBalanced')}
              </Badge>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default BalanceSheetCard;
