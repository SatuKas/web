import { useState } from 'react';
import useEmailVerificationMutation from './query/useEmailVerificationMutation';

/**
 * Custom hook for handling email verification process.
 *
 * This hook manages the loading and success state for verifying an email,
 * and exposes a function to trigger the verification process.
 *
 * @returns {{
 *   isLoading: boolean, // true if verification is in progress
 *   isSuccessVerify: boolean, // true if verification is successful
 *   processVerifyEmail: (token: string) => void // function to trigger verification with a token
 * }}
 */
const useVerifyEmail = () => {
  // Get mutation function and loading state from custom mutation hook
  const { isLoadingVerifyEmail, verifyEmail } = useEmailVerificationMutation();

  // Local loading state for the verification process
  const [isLoading, setIsLoading] = useState(true);
  // State to track if verification was successful
  const [isSuccessVerify, setIsSuccessVerify] = useState(false);

  /**
   * Triggers the email verification process using the provided token.
   * Handles success and error state updates.
   *
   * @param {string} token - The verification token from email link
   */
  const processVerifyEmail = (token: string) => {
    verifyEmail(
      { token },
      {
        onSuccess: () => {
          // Set success state and stop loading when verification succeeds
          setIsSuccessVerify(true);
          setIsLoading(false);
        },
        onError: (error) => {
          // Stop loading and reset success state if verification fails
          setIsLoading(false);
          setIsSuccessVerify(false);
          // Log error for debugging
          console.log({ error });
        },
      }
    );
  };

  return {
    // isLoading is true if either local loading or mutation loading is true
    isLoading: isLoading || isLoadingVerifyEmail,
    isSuccessVerify,
    processVerifyEmail,
  };
};

export default useVerifyEmail;
