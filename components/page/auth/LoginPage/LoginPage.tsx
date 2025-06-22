'use client';

import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/components/module/auth/LoginForm';
import { DEFAULT_AUTH_IMAGE } from '@/constants/auth';

const LoginPage = () => {
  return (
    <AuthLayout image={DEFAULT_AUTH_IMAGE}>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
