import { APP_COUNTDOWN_SECONDS } from '@/config/app';
import { RESEND_VERIFICATION_EMAIL_FORM_DEFAULT_VALUES } from '@/constants/auth';
import useCountdown from '@/hooks/common/useCountdown';
import { ResendVerificationEmailPayload } from '@/types/api/auth';
import { ResendVerificationEmailData } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useResendVerificationMutation from './query/useResendVerificationMutation';
import useForgotPasswordSchema from './useForgotPasswordSchema';

const useResendVerificationForm = () => {
  // Get forgot schema for form validation
  // Note: use this because it's has same payload
  const { forgotPasswordSchema } = useForgotPasswordSchema();

  // Get resend verification email mutation and loading state
  const { resendVerificationEmail, isLoadingResendVerificationEmail } = useResendVerificationMutation();
  const { formattedTime, isActive, startCountdown } = useCountdown(APP_COUNTDOWN_SECONDS);
  const [isEmailSent, setIsEmailSent] = useState(false);
  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<ResendVerificationEmailData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: RESEND_VERIFICATION_EMAIL_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<ResendVerificationEmailData> = (data) => {
    const payload: ResendVerificationEmailPayload = {
      email: data.email, // user's email address
    };
    resendVerificationEmail(payload, {
      onSuccess: () => {
        startCountdown();
        setIsEmailSent(true);
      },
      onError: (error) => {
        // TECHDEBT: need to handle error, if email not found, show error message to user
        console.log({ error });
      },
    });
  };

  const onError: SubmitErrorHandler<ResendVerificationEmailData> = (errors) => {
    console.log({ errors });
  };

  const resendEmail = () => {
    const formData = form.getValues();
    onSubmit(formData);
  };

  return {
    form,
    onSubmit,
    isLoadingResendVerificationEmail,
    onError,
    isEmailSent,
    formattedTime,
    isActive,
    resendEmail,
  };
};

export default useResendVerificationForm;
