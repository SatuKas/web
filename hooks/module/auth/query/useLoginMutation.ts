'use client';

import { toast } from '@/components/hoc/ToastProvider';
import { DASHBOARD_PATH_URL } from '@/constants/routes';
import { useCredentialService } from '@/hooks/common/useCredentialService';
import { authService } from '@/services/api';
import { LoginPayload, LoginResponse } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLoginMutation = () => {
  const LOGIN_QUERY_KEY = 'auth-login';
  const queryClient = useQueryClient();
  const router = useRouter();
  const { credentialService, isLoading: isLoadingCredentialService } = useCredentialService();

  const { mutate: login, isPending: isLoadingLogin } = useMutation<
    LoginResponse,
    ApiResponse<LoginResponse>,
    LoginPayload
  >({
    mutationKey: [LOGIN_QUERY_KEY],
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      if (credentialService) {
        credentialService.loginHandler({
          token: {
            accessToken: data.token.access_token,
            refreshToken: data.token.refresh_token,
          },
          expires: {
            accessToken: data.expires.access_token,
            refreshToken: data.expires.refresh_token,
          },
        });
        router.push(DASHBOARD_PATH_URL);
      }
      queryClient.invalidateQueries({ queryKey: [LOGIN_QUERY_KEY] });
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error.message || '');
    },
  });

  return { login, isLoadingLogin: isLoadingLogin || isLoadingCredentialService };
};

export default useLoginMutation;
