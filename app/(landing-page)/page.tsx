import ThemeToggle from '@/components/shared/ThemeToggle';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { LOGIN_PATH_URL, REGISTER_PATH_URL } from '@/constants/routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations();
  return (
    <Stack as="main" className="w-full min-h-screen" justify="center" align="center">
      <Stack direction="row" gap={3}>
        <Link href={LOGIN_PATH_URL}>
          <Button size="lg">{t('common.login')}</Button>
        </Link>
        <Link href={REGISTER_PATH_URL}>
          <Button size="lg" variant="secondary">
            {t('common.register')}
          </Button>
        </Link>
        <ThemeToggle />
      </Stack>
    </Stack>
  );
}
