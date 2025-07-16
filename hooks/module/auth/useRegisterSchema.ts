import { FORM_MAX_CHARACTER, FORM_MIN_CHARACTER } from '@/constants/form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

/**
 * Custom hook for generating Zod schema for user registration form validation.
 *
 * This schema validates the following fields:
 * - name: required, string, max character limit
 * - username: required, string, max character limit
 * - email: required, must be a valid email format
 * - password: required, string, min character limit
 * - confirmPassword: required, string, max character limit, must match password
 *
 * Uses next-intl for error message localization.
 *
 * @returns {Object} registerSchema - Zod schema for registration form
 */
const useRegisterSchema = () => {
  const t = useTranslations();

  // Zod schema for registration form validation
  const registerSchema = z
    .object({
      name: z
        .string()
        .nonempty(t('auth.form.message.error.nameRequired')) // name must not be empty
        .max(FORM_MAX_CHARACTER, t('common.message.error.maxCharacter', { max: FORM_MAX_CHARACTER })), // max character validation
      username: z
        .string()
        .nonempty(t('auth.form.message.error.usernameRequired')) // username must not be empty
        .max(FORM_MAX_CHARACTER, t('common.message.error.maxCharacter', { max: FORM_MAX_CHARACTER })), // max character validation
      email: z
        .string()
        .nonempty(t('auth.form.message.error.emailRequired')) // email must not be empty
        .email(t('auth.form.message.error.invalidEmail')), // must be a valid email format
      password: z
        .string()
        .nonempty(t('auth.form.message.error.passwordRequired')) // password must not be empty
        .min(FORM_MIN_CHARACTER, t('auth.form.message.error.passwordMinLength', { min: FORM_MIN_CHARACTER })), // min character validation
      confirmPassword: z
        .string()
        .nonempty(t('auth.form.message.error.confirmPasswordRequired')) // confirmPassword must not be empty
        .max(FORM_MAX_CHARACTER, t('common.message.error.maxCharacter', { max: FORM_MAX_CHARACTER })), // max character validation
    })
    // Custom validation: confirmPassword must match password
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.form.message.error.confirmPasswordNotMatch'),
      path: ['confirmPassword'],
    });

  return { registerSchema };
};

export default useRegisterSchema;
