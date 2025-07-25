import AppLogo from '@/components/shared/AppLogo';
import Box from '@/components/ui/Box';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import {
  ABOUT_PATH_URL,
  CONTACT_PATH_URL,
  LOGIN_PATH_URL,
  PRIVACY_PATH_URL,
  REGISTER_PATH_URL,
  TERMS_PATH_URL,
} from '@/constants/routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Footer = () => {
  const t = useTranslations();

  return (
    <Box as="footer" className="border-t bg-background">
      <Box className="pt-12 mx-auto max-w-7xl ">
        <Box className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 [&_a]:text-sm [&_a]:text-muted-foreground [&_a]:hover:text-primary [&_a]:hover:underline [&_a]:hover:underline-offset-1 sm:px-6 lg:px-8 px-4 ">
          <Box>
            <Box className="h-11">
              <AppLogo type="text" />
            </Box>
            <Typography variant="p" className="mt-4 text-sm text-muted-foreground">
              {t('landingPage.footer.title')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" className="text-lg font-semibold">
              {t('landingPage.footer.product.title')}
            </Typography>
            <Stack className="mt-4 space-y-2">
              <Link href="#features">{t('landingPage.footer.product.feature')}</Link>
              <Link href={REGISTER_PATH_URL}>{t('landingPage.footer.product.register')}</Link>
              <Link href={LOGIN_PATH_URL}>{t('landingPage.footer.product.login')}</Link>
            </Stack>
          </Box>
          <Box>
            <Typography variant="h3" className="text-lg font-semibold">
              {t('landingPage.footer.company.title')}
            </Typography>
            <Stack className="mt-4 space-y-2">
              <Link href={ABOUT_PATH_URL}>{t('landingPage.footer.company.about')}</Link>
              <Link href={CONTACT_PATH_URL}>{t('landingPage.footer.company.contact')}</Link>
            </Stack>
          </Box>
          <Box>
            <Typography variant="h3" className="text-lg font-semibold">
              {t('landingPage.footer.legal.title')}
            </Typography>
            <Stack className="mt-4 space-y-2">
              <Link href={PRIVACY_PATH_URL}>{t('landingPage.footer.legal.privacy')}</Link>
              <Link href={TERMS_PATH_URL}>{t('landingPage.footer.legal.terms')}</Link>
            </Stack>
          </Box>
        </Box>
        <Box className="pt-8 mt-8 border-t">
          <Typography variant="p" className="text-sm text-muted-foreground">
            {t('landingPage.footer.copyright', { year: new Date().getFullYear() })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
