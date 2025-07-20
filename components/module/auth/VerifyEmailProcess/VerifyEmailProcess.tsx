'use client';

import Spinner from '@/components/ui/Spinner';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import useVerifyEmail from '@/hooks/module/auth/useVerifyEmail';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ProcessStatus from './ProcessStatus/ProcessStatus';

/**
 * VerifyEmailProcess component handles the email verification process.
 *
 * - It reads the 'token' from the URL query params.
 * - If the token exists, it triggers the email verification process.
 * - Shows a loading spinner while verifying.
 * - Shows the result status after verification.
 */
const VerifyEmailProcess = () => {
  // Get the 'token' parameter from the URL query string
  const token = useSearchParams().get('token');

  // t: function for translation
  const t = useTranslations();

  // isLoading: boolean, true if verification is in progress
  // isSuccessVerify: boolean, true if verification is successful
  // processVerifyEmail: function to trigger verification process
  const { isLoading, isSuccessVerify, processVerifyEmail } = useVerifyEmail();

  useEffect(() => {
    // If token exists, start the verification process
    if (token) {
      processVerifyEmail(token);
    }
    // Only re-run if token changes
  }, [token]);

  return (
    <Stack width="full" height="full" justify="center" align="center">
      {isLoading ? (
        <Stack gap={2}>
          <Spinner size="xl" />
          {/* Show loading text while verifying */}
          <Typography>{t('auth.verifyEmail.title')}</Typography>
        </Stack>
      ) : (
        // Show process status, isErrorToken is true if token is missing
        <ProcessStatus isErrorToken={token === null} isSuccessVerify={isSuccessVerify} />
      )}
    </Stack>
  );
};

export default VerifyEmailProcess;
