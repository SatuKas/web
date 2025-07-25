'use client';

import { toast } from '@/components/hoc/ToastProvider';
import { DASHBOARD_BOOKS_PATH_URL } from '@/constants/routes';
import { useCredentialService } from '@/hooks/common/useCredentialService';
import { authService } from '@/services/api';
import { LoginPayload, LoginResponse } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

/**
 * Custom hook for handling user login mutation.
 *
 * This hook uses React Query's useMutation to handle the login process,
 * manages authentication tokens, and redirects the user upon successful login.
 *
 * @returns {Object} - Returns the login mutation function and loading state.
 *   - login: function to trigger the login mutation
 *   - isLoadingLogin: boolean indicating if login or credential service is loading
 */
const useLoginMutation = () => {
  const LOGIN_QUERY_KEY = 'auth-login'; // Query key for login mutation
  const queryClient = useQueryClient(); // React Query's query client instance
  const router = useRouter(); // Next.js router for navigation
  // Destructure credentialService and its loading state from custom hook
  const { credentialService, isLoading: isLoadingCredentialService } = useCredentialService();
  const t = useTranslations();
  /**
   * useMutation for login process.
   * - LoginResponse: expected response data type from login API
   * - ApiResponse<LoginResponse>: error type from API
   * - LoginPayload: payload type for login API
   */
  const { mutate: login, isPending: isLoadingLogin } = useMutation<
    LoginResponse, // response data type, contains token and expires
    ApiResponse<LoginResponse>, // error type, contains message and data
    LoginPayload // payload type, contains login credentials
  >({
    mutationKey: [LOGIN_QUERY_KEY],
    // mutationFn: function to call login API with provided payload
    mutationFn: (payload: LoginPayload) =>
      authService.login({
        ...payload,
        device_id: credentialService?.getDeviceId() ?? undefined,
      }),
    onSuccess: (data) => {
      // If credentialService is available, handle token storage and session
      if (credentialService) {
        credentialService.loginHandler({
          token: {
            accessToken: data.token.access_token, // JWT access token
            refreshToken: data.token.refresh_token, // JWT refresh token
          },
          expires: {
            accessToken: data.expires.access_token, // access token expiry timestamp
            refreshToken: data.expires.refresh_token, // refresh token expiry timestamp
          },
          device: data.device,
        });
        toast.success(t('auth.form.message.toast.successLogin'));
        // Redirect user to dashboard after successful login
        router.push(DASHBOARD_BOOKS_PATH_URL);
      }
      // Invalidate login query to refresh any related data
      queryClient.invalidateQueries({ queryKey: [LOGIN_QUERY_KEY] });
    },
    onError: (error) => {
      // Log error and show toast notification with error message
      console.log({ error });
    },
  });

  // Return login function and loading state (either mutation or credential service)
  return { login, isLoadingLogin: isLoadingLogin || isLoadingCredentialService };
};

export default useLoginMutation;
