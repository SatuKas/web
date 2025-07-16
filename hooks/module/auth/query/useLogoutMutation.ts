'use client';

import { LOGIN_PATH_URL } from '@/constants/routes';
import { useCredentialService } from '@/hooks/common/useCredentialService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useLogoutMutation = () => {
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const { credentialService, isLoading: isLoadingCredentialService } = useCredentialService();
  const router = useRouter();

  const logout = async () => {
    if (!credentialService) return;
    setIsLoadingLogout(true);
    await credentialService.logoutHandler(false);
    setIsLoadingLogout(false);
    router.push(LOGIN_PATH_URL);
  };

  return { logout, isLoadingLogout: isLoadingLogout || isLoadingCredentialService };
};

export default useLogoutMutation;
