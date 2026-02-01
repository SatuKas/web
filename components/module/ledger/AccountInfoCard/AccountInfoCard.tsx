'use client';

import { Card } from '@/components/ui/Card';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { LedgerData } from '@/types/client/report';
import { useTranslations } from 'next-intl';

interface AccountInfoCardProps {
  ledger: LedgerData;
}

const AccountInfoCard = ({ ledger }: AccountInfoCardProps) => {
  const t = useTranslations('ledger');
  const tCommon = useTranslations('common');

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numValue);
  };

  return (
    <Card className="p-6">
      <Stack direction="column" gap={6}>
        {/* Account Info */}
        <Stack direction="column" gap={2}>
          <Typography variant="h4">{t('report.accountInfo')}</Typography>
          <Stack direction="row" gap={4} className="flex-wrap">
            <Stack direction="column" gap={1}>
              <Typography variant="small" className="text-muted-foreground">
                {t('report.accountCode')}
              </Typography>
              <Typography variant="p" className="font-medium">
                {ledger.account.code}
              </Typography>
            </Stack>
            <Stack direction="column" gap={1}>
              <Typography variant="small" className="text-muted-foreground">
                {t('report.accountName')}
              </Typography>
              <Typography variant="p" className="font-medium">
                {ledger.account.name}
              </Typography>
            </Stack>
            <Stack direction="column" gap={1}>
              <Typography variant="small" className="text-muted-foreground">
                {t('report.accountPosition')}
              </Typography>
              <Typography variant="p" className="font-medium">
                {tCommon(`accountPosition.${ledger.account.position}`)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Summary */}
        <Stack direction="row" gap={6} className="flex-wrap border-t pt-4">
          <Stack direction="column" gap={1}>
            <Typography variant="small" className="text-muted-foreground">
              {t('report.openingBalance')}
            </Typography>
            <Typography variant="h5" className="font-semibold">
              {formatCurrency(parseFloat(ledger.openingBalance))}
            </Typography>
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography variant="small" className="text-muted-foreground">
              {t('report.totalDebit')}
            </Typography>
            <Typography variant="h5" className="font-semibold">
              {formatCurrency(parseFloat(ledger.totalDebit))}
            </Typography>
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography variant="small" className="text-muted-foreground">
              {t('report.totalCredit')}
            </Typography>
            <Typography variant="h5" className="font-semibold">
              {formatCurrency(parseFloat(ledger.totalCredit))}
            </Typography>
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography variant="small" className="text-muted-foreground">
              {t('report.closingBalance')}
            </Typography>
            <Typography variant="h5" className="font-semibold text-primary">
              {formatCurrency(parseFloat(ledger.closingBalance))}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default AccountInfoCard;
