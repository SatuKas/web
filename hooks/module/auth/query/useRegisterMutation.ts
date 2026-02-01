'use client';

import { useMutation } from '@/libs/react-query';
import { authService } from '@/services/api';
import { RegisterPayload, RegisterResponse } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';
import { useQueryClient } from '@tanstack/react-query';

const useRegisterMutation = () => {
  const REGISTER_QUERY_KEY = 'auth-register'; // Query key for register mutation
  const queryClient = useQueryClient(); // React Query's query client instance

  const { mutate: register, isPending: isLoadingRegister } = useMutation<
    RegisterResponse, // response data type, contains token and expires
    ApiResponse<RegisterResponse>, // error type, contains message and data
    RegisterPayload // payload type, contains register credentials
  >({
    mutationKey: [REGISTER_QUERY_KEY],
    // mutationFn: function to call login API with provided payload
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: () => {
      // Invalidate login query to refresh any related data
      queryClient.invalidateQueries({ queryKey: [REGISTER_QUERY_KEY] });
    },
  });

  // Return login function and loading state (either mutation or credential service)
  return { register, isLoadingRegister: isLoadingRegister };
};

export default useRegisterMutation;
