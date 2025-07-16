'use client';

import { CredentialService } from '@/services/api/core/CredentialService';
import { useEffect, useState } from 'react';

/**
 * Custom hook to initialize and provide an instance of CredentialService on the client side.
 *
 * @returns {{
 *   credentialService: CredentialService | null, // Holds the CredentialService instance, or null if not initialized yet
 *   isLoading: boolean // Indicates whether the service is still being initialized
 * }}
 */
export function useCredentialService() {
  // State to store the CredentialService instance
  const [credentialService, setCredentialService] = useState<CredentialService | null>(null);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only initialize CredentialService on the client side to avoid SSR issues
    if (typeof window !== 'undefined') {
      const service = new CredentialService();
      setCredentialService(service);
    }
    // Set loading to false after attempting initialization
    setIsLoading(false);
  }, []);

  return { credentialService, isLoading };
}
