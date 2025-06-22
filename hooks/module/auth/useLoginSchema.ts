import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useLoginSchema = () => {
  const t = useTranslations('auth.form.message');
  const loginSchema = z.object({
    email: z
      .string()
      .nonempty(t('error.emailRequired'))
      .email({
        message: t('error.invalidEmail'),
      }),
    password: z
      .string()
      .nonempty(t('error.passwordRequired'))
      .min(8, {
        message: t('error.passwordMinLength'),
      }),
  });

  return { loginSchema };
};

export default useLoginSchema;
