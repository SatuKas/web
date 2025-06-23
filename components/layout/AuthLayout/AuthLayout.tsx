import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Stack from '@/components/ui/Stack';
import { LANDING_PAGE_PATH_URL, PRIVACY_PATH_URL, TERMS_PATH_URL } from '@/constants/routes';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  image?: any;
}

const AuthLayout = ({ children, image }: AuthLayoutProps) => {
  const t = useTranslations();

  return (
    <Box className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Box className="w-full max-w-sm md:max-w-3xl">
        <Stack gap={6}>
          <Card className="overflow-hidden p-0 min-h-[556px]">
            <CardContent className="grid p-0 md:grid-cols-2 min-h-[556px]">
              <Stack gap={3}>
                <Stack align="center" direction="row" className="p-3 w-full">
                  <Link href={LANDING_PAGE_PATH_URL}>
                    <Button size={'sm'} variant={'outline'}>
                      <ArrowLeft /> {t('common.back')}
                    </Button>
                  </Link>
                </Stack>
                {children}
              </Stack>
              <Box className="bg-muted relative hidden md:block">
                <Image
                  src={image}
                  alt="Image"
                  width={500}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </Box>
            </CardContent>
          </Card>
          <Box className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <Link href={TERMS_PATH_URL}>Terms of Service</Link> and{' '}
            <Link href={PRIVACY_PATH_URL}>Privacy Policy</Link>.
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AuthLayout;
