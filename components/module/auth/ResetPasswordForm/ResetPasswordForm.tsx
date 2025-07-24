'use client';

import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import useResetPasswordForm from '@/hooks/module/auth/useResetPasswordForm';
import { useTranslations } from 'next-intl';

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { form, onSubmit, isLoadingResetPassword, onError } = useResetPasswordForm({ token });

  const t = useTranslations();

  return (
    <Form
      onSubmit={onSubmit}
      onError={onError}
      className="p-6 pb-12 md:p-8 md:pb-12 w-full flex items-center justify-center"
      {...form}
    >
      <Stack gap={6} width="full">
        {/* Title and subtitle */}
        <Stack className="text-center" align="center">
          <Typography variant={'h3'} className="text-2xl font-bold" textAlign="center">
            {t('auth.resetPassword.title')}
          </Typography>
          <Typography variant="p" className="text-muted-foreground" textAlign="center">
            {t('auth.resetPassword.subtitle')}
          </Typography>
        </Stack>
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
        {/* Submit button, disabled and shows loading when reset password is in progress */}
        <Button type="submit" className="w-full" disabled={isLoadingResetPassword} loading={isLoadingResetPassword}>
          {t('common.saveNewPassword')}
        </Button>
      </Stack>
    </Form>
  );
};

export default ResetPasswordForm;
