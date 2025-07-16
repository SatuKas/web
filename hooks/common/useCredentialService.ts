'use client';

import { CredentialService } from '@/services/api/core/CredentialService';
import { useEffect, useState } from 'react';

export function useCredentialService() {
  const [credentialService, setCredentialService] = useState<CredentialService | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      const service = new CredentialService();
      setCredentialService(service);
    }
    setIsLoading(false);
  }, []);

  return { credentialService, isLoading };
}
