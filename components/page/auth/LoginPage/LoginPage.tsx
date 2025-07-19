'use client';

import AuthFormLayout from '@/components/layout/AuthLayout/AuthFormLayout';
import LoginForm from '@/components/module/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthFormLayout>
      <LoginForm />
    </AuthFormLayout>
  );
};

export default LoginPage;
