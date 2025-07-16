import { LOGIN_FORM_DEFAULT_VALUES } from '@/constants/auth';
import { LoginPayload } from '@/types/api/auth';
import { LoginData } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useLoginMutation from './query/useLoginMutation';
import useLoginSchema from './useLoginSchema';

const useLoginForm = () => {
  const { loginSchema } = useLoginSchema();
  const { isLoadingLogin, login } = useLoginMutation();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    const payload: LoginPayload = {
      email: data.email,
      password: data.password,
    };
    login(payload);
  };

  const onError: SubmitErrorHandler<LoginData> = (errors) => {
    console.log({ errors });
  };

  return { form, onSubmit, isLoadingLogin, onError };
};

export default useLoginForm;
