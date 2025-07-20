'use client';

import { authService } from '@/services/api';
import { ResendVerificationEmailPayload } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Custom hook for handling resend verification email mutation.
 *
 * This hook uses React Query's useMutation to call the resend verification email API.
 * It provides a function to trigger the mutation and a loading state.
 *
 * @returns {Object} - Returns an object containing:
 *   resendVerificationEmail: function to trigger resend verification email mutation
 *   isLoadingResendVerificationEmail: boolean indicating if the mutation is in progress
 */
const useResendVerificationMutation = () => {
  // Query key for resend verification mutation, used for cache management
  const RESEND_VERIFICATION_QUERY_KEY = 'auth-resend-verification';
  // React Query's query client instance, used for cache operations like invalidation
  const queryClient = useQueryClient();

  /**
   * useMutation for resend verification email.
   *
   * - response data type: null (no data returned on success)
   * - error type: ApiResponse<null> (contains message and data)
   *   - message: string, error message from API
   *   - data: null, no additional data
   * - payload type: ResendVerificationEmailPayload (contains email)
   *   - email: string, user email to resend verification
   */
  const { mutate: resendVerificationEmail, isPending: isLoadingResendVerificationEmail } = useMutation<
    null, // response data type: no data returned on success
    ApiResponse<null>, // error type: API response with message and data
    ResendVerificationEmailPayload // payload type: contains email
  >({
    mutationKey: [RESEND_VERIFICATION_QUERY_KEY],
    // mutationFn: function to call resend verification email API with provided payload
    mutationFn: (payload: ResendVerificationEmailPayload) => authService.resendVerificationEmail(payload),
    onSuccess: () => {
      // Invalidate the resend verification query to refresh any related data in the cache
      queryClient.invalidateQueries({ queryKey: [RESEND_VERIFICATION_QUERY_KEY] });
    },
  });

  // Return the mutation trigger function and loading state
  return { resendVerificationEmail, isLoadingResendVerificationEmail };
};

export default useResendVerificationMutation;
