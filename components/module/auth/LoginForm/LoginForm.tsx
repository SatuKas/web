'use client';

import AppleBrand from '@/assets/icon/apple-brand.svg';
import GoogleBrand from '@/assets/icon/google-brand.svg';
import MetaBrand from '@/assets/icon/meta-brand.svg';
import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { FORGOT_PASSWORD_PATH_URL, REGISTER_PATH_URL } from '@/constants/routes';
import useLoginForm from '@/hooks/module/auth/useLoginForm';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  const t = useTranslations();

  return (
    <Form onSubmit={onSubmit} className="p-6 md:p-8" {...form}>
      <Stack gap={6}>
        <Stack className="text-center" align="center">
          <Typography variant={'h3'} className="text-2xl font-bold">
            {t('auth.login.title')}
          </Typography>
          <Typography variant={'p'} className="text-muted-foreground text-balance">
            {t('auth.login.subtitle')}
          </Typography>
        </Stack>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input
              type="email"
              placeholder={t('auth.form.placeholder.email')}
              label={t('auth.form.label.email')}
              {...field}
            />
          )}
        />
        <Stack gap={2}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input
                type="password"
                placeholder={t('auth.form.placeholder.password')}
                label={t('auth.form.label.password')}
                {...field}
              />
            )}
          />
          <Link href={FORGOT_PASSWORD_PATH_URL}>
            <Button variant="link" type="button" size="sm" className="px-0 text-foreground font-normal">
              {t('auth.form.label.forgotPassword')}
            </Button>
          </Link>
        </Stack>
        <Button type="submit" className="w-full">
          {t('common.login')}
        </Button>
        <Box className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <Typography as="span" className="bg-card text-muted-foreground relative z-10 px-2">
            {t('auth.continueWith')}
          </Typography>
        </Box>
        <Box className="grid grid-cols-3 gap-4">
          <Button variant="outline" type="button" className="w-full">
            <Image src={AppleBrand} alt="Apple" width={16} height={16} />
            <span className="sr-only">Login with Apple</span>
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <Image src={GoogleBrand} alt="Google" width={16} height={16} />
            <span className="sr-only">Login with Google</span>
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <Image src={MetaBrand} alt="Meta" width={16} height={16} />
            <span className="sr-only">Login with Meta</span>
          </Button>
        </Box>
        <Box className="text-center text-sm">
          {t('auth.dontHaveAccount')}{' '}
          <Link href={REGISTER_PATH_URL}>
            <Button variant="link" type="button" size="sm" className="px-0 text-foreground font-normal">
              {t('common.register')}
            </Button>
          </Link>
        </Box>
      </Stack>
    </Form>
  );
};

export default LoginForm;
