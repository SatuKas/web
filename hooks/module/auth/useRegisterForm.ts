import { toast } from '@/components/hoc/ToastProvider';
import { APP_COUNTDOWN_SECONDS } from '@/config/app';
import { REGISTER_FORM_DEFAULT_VALUES } from '@/constants/auth';
import useCountdown from '@/hooks/common/useCountdown';
import { RegisterData } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRegisterMutation from './query/useRegisterMutation';
import useResendVerificationMutation from './query/useResendVerificationMutation';
import useRegisterSchema from './useRegisterSchema';

/**
 * Custom hook for handling register form logic.
 *
 * This hook sets up react-hook-form with zod validation schema for the register form.
 * It returns the form instance and a submit handler.
 *
 * @returns {object} - Contains:
 *   form: react-hook-form methods and state for the register form
 *   onSubmit: function to handle form submission
 */
const useRegisterForm = () => {
  // Get the zod schema for register form validation
  const { registerSchema } = useRegisterSchema();
  const { isLoadingRegister, register } = useRegisterMutation();
  const { resendVerificationEmail, isLoadingResendVerificationEmail } = useResendVerificationMutation();
  const t = useTranslations();
  const [isSentEmail, setIsSentEmail] = useState(false);
  const { formattedTime, isActive, startCountdown } = useCountdown(APP_COUNTDOWN_SECONDS);

  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema), // use zod schema for validation
    defaultValues: REGISTER_FORM_DEFAULT_VALUES, // initial form values
  });

  /**
   * Handle form submission.
   *
   * @param {RegisterData} data - The form data after validation
   *   email: string // user's email address
   *   password: string // user's password
   *   confirmPassword: string // confirmation of user's password
   */
  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    register(data, {
      onSuccess: () => {
        toast.success(t('auth.form.message.toast.successRegister'));
        setIsSentEmail(true);
        startCountdown();
      },
      onError: (error) => {
        toast.error(error.message || '');
      },
    });
  };

  const resendEmail = () => {
    resendVerificationEmail(
      { email: form.getValues('email') || '' },
      {
        onSuccess: () => {
          startCountdown();
        },
      }
    );
  };

  return {
    form,
    onSubmit,
    isSentEmail,
    isLoadingRegister,
    formattedTime,
    isActive,
    resendEmail,
    isLoadingResendVerificationEmail,
  };
};

export default useRegisterForm;
