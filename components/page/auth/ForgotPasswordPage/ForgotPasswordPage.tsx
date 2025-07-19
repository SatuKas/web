import AuthFormLayout from '@/components/layout/AuthLayout/AuthFormLayout';
import ForgotPasswordForm from '@/components/module/auth/ForgotPasswordForm';
import { LOGIN_PATH_URL } from '@/constants/routes';

const ForgotPasswordPage = () => {
  return (
    <AuthFormLayout backButtonUrl={LOGIN_PATH_URL}>
      <ForgotPasswordForm />
    </AuthFormLayout>
  );
};

export default ForgotPasswordPage;
