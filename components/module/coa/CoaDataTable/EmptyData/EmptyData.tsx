import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/Empty';
import { Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';
import AddAccount from '../../AddAccount';

const EmptyData = () => {
  const t = useTranslations('coa.table.empty');
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>{t('title')}</EmptyTitle>
        <EmptyDescription>{t('description')}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddAccount />
      </EmptyContent>
    </Empty>
  );
};

export default EmptyData;
