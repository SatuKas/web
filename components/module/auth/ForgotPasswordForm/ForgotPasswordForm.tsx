'use client';

import EmailSent from '@/components/module/auth/EmailSent';
import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import useForgotPasswordForm from '@/hooks/module/auth/useForgotPasswordForm';
import { useTranslations } from 'next-intl';

const ForgotPasswordForm = () => {
  const { form, onSubmit, isLoadingForgotPassword, onError, formattedTime, isActive, isEmailSent, resendEmail } =
    useForgotPasswordForm();

  const t = useTranslations();

  return isEmailSent ? (
    <EmailSent
      countDownTimeData={{ formattedTime, isActive }}
      isLoading={isLoadingForgotPassword}
      resendEmail={resendEmail}
      title={t('auth.sentEmailResetPassword.title')}
      subtitle={t('auth.sentEmailResetPassword.subtitle', { email: form.getValues('email') || '' })}
    />
  ) : (
    <Form
      onSubmit={onSubmit}
      onError={onError}
      className="p-6 pb-12 md:p-8 md:pb-12 w-full flex items-center justify-center"
      {...form}
    >
      <Stack gap={6} width="full">
        {/* Title and subtitle */}
        <Stack className="text-center" align="center">
          <Typography variant={'h3'} className="text-2xl font-bold">
            {t('auth.forgotPassword.title')}
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            {t('auth.forgotPassword.subtitle')}
          </Typography>
        </Stack>
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
        {/* Submit button, disabled and shows loading when reset password is in progress */}
        <Button type="submit" className="w-full" disabled={isLoadingForgotPassword} loading={isLoadingForgotPassword}>
          {t('common.resetPassword')}
        </Button>
      </Stack>
    </Form>
  );
};

export default ForgotPasswordForm;
