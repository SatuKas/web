'use client';

import { LOGIN_PATH_URL } from '@/constants/routes';
import { useCredentialService } from '@/hooks/common/useCredentialService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Custom hook for handling user logout process.
 *
 * This hook provides a logout function that will:
 * 1. Call the logout handler from credentialService to clear user session.
 * 2. Set loading state during the process.
 * 3. Redirect user to login page after logout.
 *
 * @returns {Object}
 *   logout: function to trigger logout process
 *   isLoadingLogout: boolean indicating if logout or credential service is loading
 */
const useLogoutMutation = () => {
  // State to indicate if logout process is ongoing
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  // Get credentialService instance and its loading state
  const { credentialService, isLoading: isLoadingCredentialService } = useCredentialService();

  // Next.js router for navigation
  const router = useRouter();

  /**
   * Triggers the logout process.
   * - If credentialService is not ready, it will not proceed.
   * - Calls logoutHandler to clear user credentials.
   * - After logout, navigates user to login page.
   */
  const logout = async () => {
    if (!credentialService) return; // Prevent logout if service is not ready
    setIsLoadingLogout(true);
    await credentialService.logoutHandler(false); // false: do not redirect inside handler
    setIsLoadingLogout(false);
    router.push(LOGIN_PATH_URL); // Redirect to login page after logout
  };

  // Return logout function and loading state (true if either logout or credential service is loading)
  return {
    logout,
    isLoadingLogout: isLoadingLogout || isLoadingCredentialService,
  };
};

export default useLogoutMutation;
