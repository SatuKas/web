'use client';

import Box from '@/components/ui/Box';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { DASHBOARD_BOOKS_PATH_URL, DASHBOARD_ORGANIZATIONS_PATH_URL, SETTINGS_PATH_URL } from '@/constants/routes';
import { cn } from '@/libs/cn';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const t = useTranslations();

  const navigationItems = [
    {
      label: t('menu.books'),
      href: DASHBOARD_BOOKS_PATH_URL,
    },
    {
      label: t('menu.organizations'),
      href: DASHBOARD_ORGANIZATIONS_PATH_URL,
    },
    {
      label: t('menu.settings'),
      href: SETTINGS_PATH_URL,
    },
  ];

  const getActiveNavigationItem = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <Stack direction="row" className="w-full px-4">
      <Stack direction="row" gap={2} className="overflow-x-auto scrollbar-none">
        {navigationItems.map((item) => (
          <Stack
            key={item.href}
            className={cn('pb-2 transition-all border-b-2 border-transparent', {
              'border-primary': getActiveNavigationItem(item.href),
            })}
          >
            <Link href={item.href}>
              <Box className="py-1 px-2 hover:bg-muted rounded-sm transition-colors">
                <Typography variant="p" className="text-md">
                  {item.label}
                </Typography>
              </Box>
            </Link>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Navigation;
