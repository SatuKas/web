'use client';

import AuthFormLayout from '@/components/layout/AuthLayout/AuthFormLayout';
import RegisterForm from '@/components/module/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthFormLayout>
      <RegisterForm />
    </AuthFormLayout>
  );
};

export default RegisterPage;
