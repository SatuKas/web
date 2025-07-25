import { Construction } from 'lucide-react';

import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { DASHBOARD_BOOKS_PATH_URL } from '@/constants/routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ComingSoonProps {
  fullPage?: boolean;
}

const ComingSoon = ({ fullPage = false }: ComingSoonProps) => {
  const t = useTranslations();

  return (
    <Box
      className={`flex flex-col items-center justify-center gap-6 p-8 ${fullPage ? 'min-h-screen' : 'min-h-full w-full '}`}
    >
      <Stack direction="column" gap={4} align="center">
        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-muted/20">
          <Construction className="h-24 w-24 text-muted-foreground" />
        </div>

        <Stack direction="column" gap={2} align="center">
          <Typography variant="h2" className="font-bold text-4xl md:text-5xl leading-tight tracking-tight">
            {t('comingSoon.title')}
          </Typography>
          <Typography variant="p" textAlign="center" className="text-lg md:text-xl text-muted-foreground">
            {t('comingSoon.subtitle')}
          </Typography>
        </Stack>

        <Link href={DASHBOARD_BOOKS_PATH_URL} className="mt-4">
          <Button variant="default" size="lg">
            {t('comingSoon.button')}
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default ComingSoon;
