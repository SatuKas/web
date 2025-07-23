import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { REGISTER_PATH_URL } from '@/constants/routes';
import { Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const CtaSection = () => {
  const t = useTranslations();

  return (
    <Box as="section" className="relative overflow-hidden pb-16">
      <Stack className="animate-fade-up rounded-3xl bg-primary/5 px-6 py-20 text-center sm:px-12" gap={5}>
        <Stack gap={2}>
          <Typography variant="h2" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('landingPage.ctaSection.title')}
          </Typography>
          <Typography variant="p" className="max-w-2xl text-muted-foreground">
            {t('landingPage.ctaSection.subtitle')}
          </Typography>
        </Stack>
        <Link href={REGISTER_PATH_URL} className="w-fit">
          <Button size="lg" className="animate-fadeIn delay-100">
            {t('common.noteNow')} <Flame />
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default CtaSection;
