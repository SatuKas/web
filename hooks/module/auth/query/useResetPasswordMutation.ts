'use client';

import { useMutation } from '@/libs/react-query';
import { authService } from '@/services/api';
import { ResetPasswordPayload } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';
import { useQueryClient } from '@tanstack/react-query';

const useResetPasswordMutation = () => {
  const RESET_PASSWORD_QUERY_KEY = 'auth-reset-password'; // Query key for reset password mutation
  const queryClient = useQueryClient(); // React Query's query client instance

  const { mutate: resetPassword, isPending: isLoadingResetPassword } = useMutation<
    null, // response data type, contains token and expires
    ApiResponse<null>, // error type, contains message and data
    ResetPasswordPayload // payload type, contains reset password credentials
  >({
    mutationKey: [RESET_PASSWORD_QUERY_KEY],
    // mutationFn: function to call reset password API with provided payload
    mutationFn: (payload: ResetPasswordPayload) => authService.resetPassword(payload),
    onSuccess: () => {
      // Invalidate forgot password query to refresh any related data
      queryClient.invalidateQueries({ queryKey: [RESET_PASSWORD_QUERY_KEY] });
    },
  });

  // Return reset password function and loading state (either mutation or credential service)
  return { resetPassword, isLoadingResetPassword };
};

export default useResetPasswordMutation;
