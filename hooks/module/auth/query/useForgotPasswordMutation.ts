'use client';

import { useMutation } from '@/libs/react-query';
import { authService } from '@/services/api';
import { ForgotPasswordPayload } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';
import { useQueryClient } from '@tanstack/react-query';

const useForgotPasswordMutation = () => {
  const FORGOT_PASSWORD_QUERY_KEY = 'auth-forgot-password'; // Query key for login mutation
  const queryClient = useQueryClient(); // React Query's query client instance

  const { mutate: forgotPassword, isPending: isLoadingForgotPassword } = useMutation<
    null, // response data type, contains token and expires
    ApiResponse<null>, // error type, contains message and data
    ForgotPasswordPayload // payload type, contains login credentials
  >({
    mutationKey: [FORGOT_PASSWORD_QUERY_KEY],
    // mutationFn: function to call login API with provided payload
    mutationFn: (payload: ForgotPasswordPayload) => authService.forgotPassword(payload),
    onSuccess: () => {
      // Invalidate forgot password query to refresh any related data
      queryClient.invalidateQueries({ queryKey: [FORGOT_PASSWORD_QUERY_KEY] });
    },
    onError: (error) => {
      // Log error and show toast notification with error message
      console.log({ error });
    },
  });

  // Return login function and loading state (either mutation or credential service)
  return { forgotPassword, isLoadingForgotPassword };
};

export default useForgotPasswordMutation;
