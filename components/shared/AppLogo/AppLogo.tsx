'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Box from '@/components/ui/Box';
import { APP_LOGO } from '@/config/app';
import { AppLogoIconVariant, AppLogoTextVariant, AppLogoType, AppLogo as TypeAppLogo } from '@/types/client/ui';
import { useMemo } from 'react';

interface AppLogoProps<T extends AppLogoType> {
  type: T;
  variant?: T extends 'text' ? AppLogoTextVariant : AppLogoIconVariant;
}

const AppLogo = <T extends AppLogoType>({ type, variant }: AppLogoProps<T>) => {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logo = useMemo(() => {
    const selectedLogo = APP_LOGO[type];

    if (variant) {
      if (type === 'text') {
        return selectedLogo[variant as AppLogoTextVariant];
      }
      return (selectedLogo as TypeAppLogo['icon'])[variant as AppLogoIconVariant];
    }

    // During initial render or server-side, default to light theme
    if (!mounted) return selectedLogo.light;

    // After mounting, use the actual theme
    if (theme === 'light' || systemTheme === 'light') {
      return selectedLogo.dark;
    }
    return selectedLogo.light;
  }, [theme, systemTheme, type, variant, mounted]);

  // Prevent hydration mismatch by using a fixed size container
  return (
    <Box>
      <Image src={logo} alt="logo" width={100} height={100} className="object-contain" priority />
    </Box>
  );
};

export default AppLogo;
