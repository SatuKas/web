import { REGISTER_FORM_DEFAULT_VALUES } from '@/constants/auth';
import { RegisterPayload } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRegisterSchema from './useRegisterSchema';

const useRegisterForm = () => {
  const { registerSchema } = useRegisterSchema();

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<RegisterPayload> = (data) => {
    console.log({ data });
  };

  return { form, onSubmit };
};

export default useRegisterForm;
