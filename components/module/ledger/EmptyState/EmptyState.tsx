'use client';

import { Card } from '@/components/ui/Card';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { useTranslations } from 'next-intl';

const EmptyState = () => {
  const t = useTranslations('ledger');

  return (
    <Card className="p-8">
      <Stack direction="column" gap={2} align="center">
        <Typography variant="h3">{t('empty.title')}</Typography>
        <Typography variant="p" className="text-muted-foreground">
          {t('empty.description')}
        </Typography>
      </Stack>
    </Card>
  );
};

export default EmptyState;
