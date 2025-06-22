'use client';

import AuthLayout from '@/components/layout/AuthLayout';
import RegisterForm from '@/components/module/auth/RegisterForm';
import { DEFAULT_AUTH_IMAGE } from '@/constants/auth';

const RegisterPage = () => {
  return (
    <AuthLayout image={DEFAULT_AUTH_IMAGE}>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
