'use client';

import AuthFormLayout from '@/components/layout/AuthLayout/AuthFormLayout';
import ResetPasswordForm from '@/components/module/auth/ResetPasswordForm';
import { notFound, useSearchParams } from 'next/navigation';

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return notFound();
  }

  return (
    <AuthFormLayout backButton={false}>
      <ResetPasswordForm token={token} />
    </AuthFormLayout>
  );
};

export default ResetPasswordPage;
