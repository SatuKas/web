'use client';

import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { LOGIN_PATH_URL } from '@/constants/routes';
import useRegisterForm from '@/hooks/module/auth/useRegisterForm';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const RegisterForm = () => {
  const { form, onSubmit } = useRegisterForm();

  const t = useTranslations();

  return (
    <Form onSubmit={onSubmit} className="p-6 md:p-8 w-full flex items-center justify-center" {...form}>
      <Stack gap={6} width="full">
        <Stack className="text-center" align="center">
          <Typography variant={'h3'} className="text-2xl font-bold">
            {t('auth.register.title')}
          </Typography>
          <Typography variant={'p'} className="text-muted-foreground text-balance">
            {t('auth.register.subtitle')}
          </Typography>
        </Stack>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              type="text"
              placeholder={t('auth.form.placeholder.name')}
              label={t('auth.form.label.name')}
              required
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <Input
              type="text"
              placeholder={t('auth.form.placeholder.username')}
              label={t('auth.form.label.username')}
              required
              {...field}
            />
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              type="password"
              placeholder={t('auth.form.placeholder.confirmPassword')}
              label={t('auth.form.label.confirmPassword')}
              required
              {...field}
            />
          )}
        />
        <Button type="submit" className="w-full">
          {t('common.login')}
        </Button>
        <Box className="text-center text-sm">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link href={LOGIN_PATH_URL}>
            <Button variant="link" type="button" size="sm" className="px-0 text-foreground font-normal">
              {t('common.login')}
            </Button>
          </Link>
        </Box>
      </Stack>
    </Form>
  );
};

export default RegisterForm;
