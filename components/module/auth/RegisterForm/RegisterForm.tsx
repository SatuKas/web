'use client';

import AuthFormLayout from '@/components/layout/AuthLayout/AuthFormLayout';
import EmailSent from '@/components/module/auth/EmailSent';
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

/**
 * RegisterForm component for handling user registration.
 *
 * This component renders a registration form with fields for name, username, email, password, and confirm password.
 * It uses react-hook-form (via useRegisterForm) for form state management and validation.
 * The form also provides navigation to the login page for users who already have an account.
 *
 * - Handles form submission via onSubmit from useRegisterForm.
 * - Uses next-intl for translation of all labels and placeholders.
 * - Each field is wrapped in FormField for validation and error handling.
 * - The submit button and login link are both translated.
 */
const RegisterForm = () => {
  // useRegisterForm provides form state and submit handler
  const {
    form,
    onSubmit,
    isLoadingRegister,
    isSentEmail,
    formattedTime,
    isActive,
    resendEmail,
    isLoadingResendVerificationEmail,
  } = useRegisterForm();

  // t is the translation function from next-intl
  const t = useTranslations();

  return isSentEmail ? (
    <EmailSent
      countDownTimeData={{ formattedTime, isActive }}
      isLoading={isLoadingResendVerificationEmail}
      resendEmail={resendEmail}
      title={t('auth.sentEmailVerification.title')}
      subtitle={t('auth.sentEmailVerification.subtitle', { email: form.getValues('email') || '' })}
    />
  ) : (
    <AuthFormLayout>
      <Form onSubmit={onSubmit} className="p-6 md:p-8 w-full flex items-center justify-center" {...form}>
        <Stack gap={6} width="full">
          {/* Title and subtitle */}
          <Stack className="text-center" align="center">
            <Typography variant={'h3'} className="text-2xl font-bold" textAlign="center">
              {t('auth.register.title')}
            </Typography>
            <Typography variant={'p'} className="text-muted-foreground text-balance" textAlign="center">
              {t('auth.register.subtitle')}
            </Typography>
          </Stack>
          {/* Name input field */}
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
          {/* Username input field */}
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
          {/* Email input field */}
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
          {/* Password input field */}
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
          {/* Confirm password input field */}
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
          {/* Submit button */}
          <Button type="submit" className="w-full" disabled={isLoadingRegister} loading={isLoadingRegister}>
            {t('common.register')}
          </Button>
          {/* Link to login page for users who already have an account */}
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
    </AuthFormLayout>
  );
};

export default RegisterForm;
