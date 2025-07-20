import AuthFormLayout from '@/components/layout/AuthLayout/AuthFormLayout';
import VerifyEmailProcess from '@/components/module/auth/VerifyEmailProcess';

const VerifyEmailPage = () => {
  return (
    <AuthFormLayout backButton={false}>
      <VerifyEmailProcess />
    </AuthFormLayout>
  );
};

export default VerifyEmailPage;
