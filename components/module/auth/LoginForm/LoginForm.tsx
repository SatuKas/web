'use client';

import AppleBrand from '@/assets/icon/AppleBrand';
import GoogleBrand from '@/assets/icon/GoogleBrand';
import MetaBrand from '@/assets/icon/MetaBrand';
import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import Tooltip from '@/components/ui/Tooltip';
import Typography from '@/components/ui/Typography';
import { AUTH_CONFIG } from '@/config/app';
import { FORGOT_PASSWORD_PATH_URL, REGISTER_PATH_URL } from '@/constants/routes';
import useLoginForm from '@/hooks/module/auth/useLoginForm';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  const t = useTranslations();

  return (
    <Form onSubmit={onSubmit} className="p-6 md:p-8 w-full flex items-center justify-center" {...form}>
      <Stack gap={6} width="full">
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
              required
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
                required
                {...field}
              />
            )}
          />
          {AUTH_CONFIG.forgotPassword ? (
            <Link href={FORGOT_PASSWORD_PATH_URL}>
              <Button variant="link" type="button" size="sm" className="px-0 text-foreground font-normal">
                {t('auth.form.label.forgotPassword')}
              </Button>
            </Link>
          ) : null}
        </Stack>
        <Button type="submit" className="w-full">
          {t('common.login')}
        </Button>
        {AUTH_CONFIG.socialMedia ? (
          <>
            <Box className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <Typography as="span" className="bg-card text-muted-foreground relative z-10 px-2">
                {t('auth.continueWith')}
              </Typography>
            </Box>
            <Box className="grid grid-cols-3 gap-4">
              <Tooltip content={t('auth.form.label.loginWithApple')}>
                <Button variant="outline" type="button" className="w-full fill-primary">
                  <AppleBrand />
                  <span className="sr-only">{t('auth.form.label.loginWithApple')}</span>
                </Button>
              </Tooltip>
              <Tooltip content={t('auth.form.label.loginWithGoogle')}>
                <Button variant="outline" type="button" className="w-full fill-primary">
                  <GoogleBrand />
                  <span className="sr-only">{t('auth.form.label.loginWithGoogle')}</span>
                </Button>
              </Tooltip>
              <Tooltip content={t('auth.form.label.loginWithFacebook')}>
                <Button variant="outline" type="button" className="w-full fill-primary">
                  <MetaBrand />
                  <span className="sr-only">{t('auth.form.label.loginWithFacebook')}</span>
                </Button>
              </Tooltip>
            </Box>
          </>
        ) : null}
        {AUTH_CONFIG.signUp ? (
          <Box className="text-center text-sm">
            {t('auth.dontHaveAccount')}{' '}
            <Link href={REGISTER_PATH_URL}>
              <Button variant="link" type="button" size="sm" className="px-0 text-foreground font-normal">
                {t('common.register')}
              </Button>
            </Link>
          </Box>
        ) : null}
      </Stack>
    </Form>
  );
};

export default LoginForm;
