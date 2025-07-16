'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import Button from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

/**
 * Props for ThemeToggle component.
 */
interface ThemeToggleProps {
  children?: React.ReactNode; // Optional: custom trigger element for the dropdown
  isMobile?: boolean; // Optional: if true, dropdown opens to bottom, otherwise to the right
}

/**
 * ThemeIcon component displays sun and moon icons.
 * The icon changes based on the current theme (light/dark) using CSS classes.
 * The <span> is for screen readers to provide accessible label.
 */
export const ThemeIcon = () => {
  const t = useTranslations();
  return (
    <>
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">{t('common.theme.title')}</span>
    </>
  );
};

/**
 * ThemeToggle component provides a dropdown to switch between light, dark, and system themes.
 * Uses next-themes for theme management and next-intl for translations.
 *
 * @param {ThemeToggleProps} props - Props for ThemeToggle
 * @returns {JSX.Element}
 */
function ThemeToggle({ children, isMobile }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const t = useTranslations();

  // DropdownMenuCheckboxItem is used for each theme option.
  // When an item is selected, setTheme is called to update the theme.
  // The checked prop ensures the current theme is visually indicated.
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="ghost" size="icon">
            <ThemeIcon />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={isMobile ? 'bottom' : 'right'} // On mobile, dropdown opens to bottom; otherwise, to the right
        align={isMobile ? 'end' : 'start'} // Alignment changes based on device
      >
        <DropdownMenuCheckboxItem checked={theme === 'light'} onCheckedChange={() => setTheme('light')}>
          {t('common.theme.light')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === 'dark'} onCheckedChange={() => setTheme('dark')}>
          {t('common.theme.dark')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === 'system'} onCheckedChange={() => setTheme('system')}>
          {t('common.theme.system')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
