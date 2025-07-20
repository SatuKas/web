import { toast } from '@/components/hoc/ToastProvider';
import { APP_COUNTDOWN_SECONDS } from '@/config/app';
import { FORGOT_PASSWORD_FORM_DEFAULT_VALUES } from '@/constants/auth';
import useCountdown from '@/hooks/common/useCountdown';
import { ForgotPasswordPayload } from '@/types/api/auth';
import { ForgotPasswordData } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useForgotPasswordMutation from './query/useForgotPasswordMutation';
import useForgotPasswordSchema from './useForgotPasswordSchema';

const useForgotPasswordForm = () => {
  // Get login schema for form validation
  const { forgotPasswordSchema } = useForgotPasswordSchema();

  // Get login mutation and loading state
  const { isLoadingForgotPassword, forgotPassword } = useForgotPasswordMutation();
  const { formattedTime, isActive, startCountdown } = useCountdown(APP_COUNTDOWN_SECONDS);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const t = useTranslations();
  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: FORGOT_PASSWORD_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<ForgotPasswordData> = (data) => {
    const payload: ForgotPasswordPayload = {
      email: data.email, // user's email address
    };
    forgotPassword(payload, {
      onSuccess: () => {
        startCountdown();
        setIsEmailSent(true);
        toast.success(t('auth.form.message.toast.successSentForgotPasswordEmail'));
      },
    });
  };

  const onError: SubmitErrorHandler<ForgotPasswordData> = (errors) => {
    console.log({ errors });
  };

  const resendEmail = () => {
    const formData = form.getValues();
    onSubmit(formData);
  };

  return { form, onSubmit, isLoadingForgotPassword, onError, isEmailSent, formattedTime, isActive, resendEmail };
};

export default useForgotPasswordForm;
