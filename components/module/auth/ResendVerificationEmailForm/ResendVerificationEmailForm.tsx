import AuthFormLayout from '@/components/layout/AuthLayout/AuthFormLayout';
import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { LOGIN_PATH_URL } from '@/constants/routes';
import useResendVerificationForm from '@/hooks/module/auth/useResendVerificationForm';
import { useTranslations } from 'next-intl';
import EmailSent from '../EmailSent';

const ResendVerificationEmailForm = () => {
  const {
    form,
    onSubmit,
    isLoadingResendVerificationEmail,
    onError,
    formattedTime,
    isActive,
    isEmailSent,
    resendEmail,
  } = useResendVerificationForm();

  const t = useTranslations();

  return isEmailSent ? (
    <EmailSent
      countDownTimeData={{ formattedTime, isActive }}
      isLoading={isLoadingResendVerificationEmail}
      resendEmail={resendEmail}
      title={t('auth.sentEmailVerification.title')}
      subtitle={t('auth.sentEmailVerification.subtitle', { email: form.getValues('email') || '' })}
    />
  ) : (
    <AuthFormLayout backButtonUrl={LOGIN_PATH_URL}>
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
              {t('auth.resendVerificationEmail.title')}
            </Typography>
            <Typography variant="p" className="text-muted-foreground" textAlign="center">
              {t('auth.resendVerificationEmail.subtitle')}
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
          <Button
            type="submit"
            className="w-full"
            disabled={isLoadingResendVerificationEmail}
            loading={isLoadingResendVerificationEmail}
          >
            {t('common.verify')}
          </Button>
        </Stack>
      </Form>
    </AuthFormLayout>
  );
};

export default ResendVerificationEmailForm;
