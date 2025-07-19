import { FORM_MAX_CHARACTER, FORM_MIN_CHARACTER } from '@/constants/form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useResetPasswordSchema = () => {
  // Get translation function for auth form messages
  const t = useTranslations();

  // Define Zod schema for login form
  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .nonempty(t('auth.form.message.error.passwordRequired')) // password must not be empty
        .min(FORM_MIN_CHARACTER, t('auth.form.message.error.passwordMinLength', { min: FORM_MIN_CHARACTER })), // min character validation
      confirmPassword: z
        .string()
        .nonempty(t('auth.form.message.error.confirmPasswordRequired')) // confirmPassword must not be empty
        .max(FORM_MAX_CHARACTER, t('common.message.error.maxCharacter', { max: FORM_MAX_CHARACTER })), // max character validation
    }) // Custom validation: confirmPassword must match password
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.form.message.error.confirmPasswordNotMatch'),
      path: ['confirmPassword'],
    });

  return { resetPasswordSchema };
};

export default useResetPasswordSchema;
