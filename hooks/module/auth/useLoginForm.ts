import { LOGIN_FORM_DEFAULT_VALUES } from '@/constants/auth';
import { LoginPayload } from '@/types/api/auth';
import { ExceptionCode } from '@/types/api/common';
import { LoginData } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useLoginMutation from './query/useLoginMutation';
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

  const [isUserVerified, setIsUserVerified] = useState(true);

  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  /**
   * Handle form submission.
   * Converts form data to API payload and triggers login mutation.
   *
   * @param {LoginData} data - Form data from react-hook-form
   */
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    const payload: LoginPayload = {
      username: data.username, // user's username
      password: data.password, // user's password
    };
    login(payload, {
      onError: (error) => {
        if (error.code === ExceptionCode.EMAIL_NOT_VERIFIED) {
          setIsUserVerified(false);
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
    // TECHDEBT: need to show error message to user
    console.log({ errors });
  };

  return {
    form,
    onSubmit,
    isLoadingLogin,
    onError,
    isUserVerified,
  };
};

export default useLoginForm;
