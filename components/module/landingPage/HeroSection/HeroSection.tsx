import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { REGISTER_PATH_URL } from '@/constants/routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const HeroSection = () => {
  const t = useTranslations();

  return (
    <Stack className="pt-12 md:pt-24 pb-16" gap={6} justify="center" align="center">
      <Stack gap={5} className="max-w-2xl">
        <Typography variant="h1" className="font-black animate-fadeIn" textAlign="center">
          {t('landingPage.heroSection.title1')}
          <br />
          {t('landingPage.heroSection.title2')}
        </Typography>
        <Typography variant="p" textAlign="center" className="animate-fadeIn text-muted-foreground">
          {t('landingPage.heroSection.subtitle')}
        </Typography>
      </Stack>
      <Link href={REGISTER_PATH_URL} className="w-fit">
        <Button size="lg" className="animate-fadeIn delay-100">
          {t('common.noteNow')}
        </Button>
      </Link>
    </Stack>
  );
};

export default HeroSection;
