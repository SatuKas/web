import { toast } from '@/components/hoc/ToastProvider';
import { RESET_PASSWORD_FORM_DEFAULT_VALUES } from '@/constants/auth';
import { LOGIN_PATH_URL } from '@/constants/routes';
import { ResetPasswordPayload } from '@/types/api/auth';
import { ResetPasswordData } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useResetPasswordMutation from './query/useResetPasswordMutation';
import useResetPasswordSchema from './useResetPasswordSchema';

interface ResetPasswordFormProps {
  token: string;
}

const useResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const t = useTranslations();
  const router = useRouter();
  // Get reset password schema for form validation
  const { resetPasswordSchema } = useResetPasswordSchema();

  // Get reset password mutation and loading state
  const { isLoadingResetPassword, resetPassword } = useResetPasswordMutation();

  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: RESET_PASSWORD_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = (data) => {
    const payload: ResetPasswordPayload = {
      password: data.password, // user's password
      token: token,
    };
    resetPassword(payload, {
      onSuccess: () => {
        toast.success(t('auth.form.message.toast.successResetPassword'));
        router.push(LOGIN_PATH_URL);
      },
      onError: (error) => {
        toast.error(t('auth.form.message.toast.errorResetPassword'));
        console.log({ error });
      },
    });
  };

  const onError: SubmitErrorHandler<ResetPasswordData> = (errors) => {
    console.log({ errors });
  };

  return { form, onSubmit, isLoadingResetPassword, onError };
};

export default useResetPasswordForm;
