import Box from '@/components/ui/Box';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface EmptyDataProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  callToAction?: React.ReactNode;
}

const EmptyData = ({ icon, title, description, callToAction }: EmptyDataProps) => {
  const t = useTranslations();

  const defaultTitle = t('emptyData.default.title');
  const defaultDescription = t('emptyData.default.description');

  return (
    <Stack className="w-full min-h-full flex-1" justify="center" align="center">
      <Stack gap={4} align="center">
        {icon || <Inbox size={96} className="text-muted-foreground" />}
        <Stack align="center">
          <Typography variant="h3" textAlign="center">
            {title || defaultTitle}
          </Typography>
          <Typography variant="p" className="text-muted-foreground" textAlign="center">
            {description || defaultDescription}
          </Typography>
        </Stack>
        <Box>{callToAction}</Box>
      </Stack>
    </Stack>
  );
};

export default EmptyData;
