import { APP_COUNTDOWN_SECONDS } from '@/config/app';
import { LOGIN_FORM_DEFAULT_VALUES } from '@/constants/auth';
import useCountdown from '@/hooks/common/useCountdown';
import { LoginPayload } from '@/types/api/auth';
import { ExceptionCode } from '@/types/api/common';
import { LoginData } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useLoginMutation from './query/useLoginMutation';
import useResendVerificationMutation from './query/useResendVerificationMutation';
import useLoginSchema from './useLoginSchema';

/**
 * Custom hook for handling login form logic.
 *
 * This hook provides form state management, validation, and submit handlers
 * for the login form. It uses react-hook-form for form state and zod for validation.
 *
 * @returns {object} - Returns form instance, submit handler, loading state, and error handler.
 *   - form: react-hook-form instance for the login form
 *   - onSubmit: function to handle form submission
 *   - isLoadingLogin: boolean indicating if login request is in progress
 *   - onError: function to handle form validation errors
 */
const useLoginForm = () => {
  // Get login schema for form validation
  const { loginSchema } = useLoginSchema();

  // Get login mutation and loading state
  const { isLoadingLogin, login } = useLoginMutation();
  const { resendVerificationEmail, isLoadingResendVerificationEmail } = useResendVerificationMutation();

  const [isUserVerified, setIsUserVerified] = useState(false);
  const { formattedTime, isActive, startCountdown } = useCountdown(APP_COUNTDOWN_SECONDS);

  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

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

  /**
   * Handle form submission.
   * Converts form data to API payload and triggers login mutation.
   *
   * @param {LoginData} data - Form data from react-hook-form
   */
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    const payload: LoginPayload = {
      email: data.email, // user's email address
      password: data.password, // user's password
    };
    login(payload, {
      onError: (error) => {
        if (error.code === ExceptionCode.EMAIL_NOT_VERIFIED) {
          resendEmail();
          setIsUserVerified(true);
        }
      },
    });
  };

  /**
   * Handle form validation errors.
   * Currently logs errors to the console for debugging.
   *
   * @param {FieldErrors<LoginData>} errors - Validation errors from react-hook-form
   */
  const onError: SubmitErrorHandler<LoginData> = (errors) => {
    console.log({ errors });
  };

  return {
    form,
    onSubmit,
    isLoadingLogin,
    onError,
    isUserVerified,
    isLoadingResendVerificationEmail,
    formattedTime,
    isActive,
    resendEmail,
  };
};

export default useLoginForm;
