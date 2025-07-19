import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useForgotPasswordSchema = () => {
  // Get translation function for auth form messages
  const t = useTranslations('auth.form.message');

  // Define Zod schema for login form
  const forgotPasswordSchema = z.object({
    email: z
      .string()
      .nonempty(t('error.emailRequired')) // Email must not be empty
      .email({
        message: t('error.invalidEmail'), // Must be a valid email format
      }),
  });

  return { forgotPasswordSchema };
};

export default useForgotPasswordSchema;
