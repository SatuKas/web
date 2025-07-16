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

  // Define Zod schema for login form
  const loginSchema = z.object({
    email: z
      .string()
      .nonempty(t('error.emailRequired')) // Email must not be empty
      .email({
        message: t('error.invalidEmail'), // Must be a valid email format
      }),
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
