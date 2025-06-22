import { LOGIN_FORM_DEFAULT_VALUES } from '@/constants/auth';
import { LoginPayload } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLoginSchema from './useLoginSchema';

const useLoginForm = () => {
  const { loginSchema } = useLoginSchema();

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    console.log({ data });
  };

  return { form, onSubmit };
};

export default useLoginForm;
