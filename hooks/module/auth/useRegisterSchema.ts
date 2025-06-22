import { FORM_MAX_CHARACTER, FORM_MIN_CHARACTER } from '@/constants/form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useRegisterSchema = () => {
  const t = useTranslations();
  const registerSchema = z
    .object({
      name: z
        .string()
        .nonempty(t('auth.form.message.error.nameRequired'))
        .max(FORM_MAX_CHARACTER, t('common.message.error.maxCharacter', { max: FORM_MAX_CHARACTER })),
      username: z
        .string()
        .nonempty(t('auth.form.message.error.usernameRequired'))
        .max(FORM_MAX_CHARACTER, t('common.message.error.maxCharacter', { max: FORM_MAX_CHARACTER })),
      email: z
        .string()
        .nonempty(t('auth.form.message.error.emailRequired'))
        .email(t('auth.form.message.error.invalidEmail')),
      password: z
        .string()
        .nonempty(t('auth.form.message.error.passwordRequired'))
        .min(FORM_MIN_CHARACTER, t('auth.form.message.error.passwordMinLength', { min: FORM_MIN_CHARACTER })),
      confirmPassword: z
        .string()
        .nonempty(t('auth.form.message.error.confirmPasswordRequired'))
        .max(FORM_MAX_CHARACTER, t('common.message.error.maxCharacter', { max: FORM_MAX_CHARACTER })),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.form.message.error.confirmPasswordNotMatch'),
      path: ['confirmPassword'],
    });

  return { registerSchema };
};

export default useRegisterSchema;
