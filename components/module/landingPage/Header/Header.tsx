'use client';

import { useEffect, useState } from 'react';

import AppLogo from '@/components/shared/AppLogo';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { LANDING_PAGE_PATH_URL, LOGIN_PATH_URL, REGISTER_PATH_URL } from '@/constants/routes';
import { cn } from '@/libs/cn';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const SCROLL_THRESHOLD = 100;
const Header = () => {
  const t = useTranslations();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Stack
      as="header"
      className={cn('h-17 sticky top-0 left-0 z-[60] w-full transition-all duration-300', {
        'bg-background/70 backdrop-blur-md border-b': isScrolled,
        'bg-background': !isScrolled,
      })}
    >
      <Stack
        className="mx-auto w-full max-w-screen-2xl px-4 relative py-4"
        direction="row"
        justify="between"
        align="center"
      >
        <Link href={LANDING_PAGE_PATH_URL} className="h-full">
          <AppLogo type="text" />
        </Link>
        <Stack direction="row" gap={2} align="center">
          <Link href={LOGIN_PATH_URL}>
            <Button variant="ghost" size="sm">
              {t('common.login')}
            </Button>
          </Link>
          <Link href={REGISTER_PATH_URL}>
            <Button size="sm">{t('common.noteNow')}</Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
