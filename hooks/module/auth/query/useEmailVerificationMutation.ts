'use client';

import { useMutation } from '@/libs/react-query';
import { authService } from '@/services/api';
import { VerifyEmailPayload } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';
import { useQueryClient } from '@tanstack/react-query';

const useEmailVerificationMutation = () => {
  const EMAIL_VERIFICATION_QUERY_KEY = 'auth-email-verification'; // Query key for register mutation
  const queryClient = useQueryClient(); // React Query's query client instance

  const { mutate: verifyEmail, isPending: isLoadingVerifyEmail } = useMutation<
    null, // response data type, contains token and expires
    ApiResponse<null>, // error type, contains message and data
    VerifyEmailPayload // payload type, contains register credentials
  >({
    mutationKey: [EMAIL_VERIFICATION_QUERY_KEY],
    // mutationFn: function to call login API with provided payload
    mutationFn: (payload: VerifyEmailPayload) => authService.verifyEmail(payload),
    onSuccess: () => {
      // Invalidate login query to refresh any related data
      queryClient.invalidateQueries({ queryKey: [EMAIL_VERIFICATION_QUERY_KEY] });
    },
  });

  // Return login function and loading state (either mutation or credential service)
  return { verifyEmail, isLoadingVerifyEmail };
};

export default useEmailVerificationMutation;
