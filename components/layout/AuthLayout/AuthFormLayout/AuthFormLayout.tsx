import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { LANDING_PAGE_PATH_URL } from '@/constants/routes';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

/**
 * Props for AuthFormLayout component.
 * @property {React.ReactNode} children - The form content to be rendered inside the layout.
 * @property {boolean} [backButton] - If true, show the back button at the top of the form. Default is true.
 * @property {string} [backButtonUrl] - The URL to navigate to when the back button is clicked. Default is LANDING_PAGE_PATH_URL.
 */
interface AuthFormLayoutProps {
  children: React.ReactNode; // The form content to be rendered inside the layout
  backButton?: boolean; // Show/hide the back button
  backButtonUrl?: string; // URL for the back button navigation
}

/**
 * AuthFormLayout is a reusable layout for authentication forms.
 * It optionally displays a back button at the top, and renders the form content below.
 * The back button uses internationalized text and navigates to the provided URL.
 */
const AuthFormLayout = ({
  children,
  backButton = true,
  backButtonUrl = LANDING_PAGE_PATH_URL,
}: AuthFormLayoutProps) => {
  const t = useTranslations(); // Get translation function for internationalization

  return (
    <Stack gap={3}>
      {/* Conditionally render the back button if backButton is true */}
      {backButton && (
        <Stack align="center" direction="row" className="p-3 w-full">
          <Link href={backButtonUrl}>
            <Button size="sm" variant={'outline'}>
              <ArrowLeft /> {t('common.back')}
            </Button>
          </Link>
        </Stack>
      )}
      {/* Render the form content */}
      {children}
    </Stack>
  );
};

export default AuthFormLayout;
