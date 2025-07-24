import { useTranslations } from 'next-intl';
import { z } from 'zod';

/**
 * Custom hook for generating login form validation schema using Zod.
 *
 * This hook utilizes next-intl for translation of error messages,
 * ensuring that validation feedback is localized.
 *
 * @returns {Object} loginSchema - Zod schema for login form validation.
 */
const useLoginSchema = () => {
  // Get translation function for auth form messages
  const t = useTranslations('auth.form.message');

  // TECHDEBT: need to add error message for username
  // Define Zod schema for login form
  const loginSchema = z.object({
    username: z.string().nonempty(t('error.usernameRequired')), // Username must not be empty
    password: z
      .string()
      .nonempty(t('error.passwordRequired')) // Password must not be empty
      .min(8, {
        message: t('error.passwordMinLength'), // Password must be at least 8 characters
      }),
  });

  return { loginSchema };
};

export default useLoginSchema;
