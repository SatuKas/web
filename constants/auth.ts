import AuthImage from '@/assets/image/auth-illustration.jpg';
import {
  ForgotPasswordData,
  LoginData,
  RegisterData,
  ResendVerificationEmailData,
  ResetPasswordData,
} from '@/types/client/auth';

export const LOGIN_FORM_DEFAULT_VALUES: LoginData = {
  username: '',
  password: '',
};

export const REGISTER_FORM_DEFAULT_VALUES: RegisterData = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const FORGOT_PASSWORD_FORM_DEFAULT_VALUES: ForgotPasswordData = {
  email: '',
};

export const RESEND_VERIFICATION_EMAIL_FORM_DEFAULT_VALUES: ResendVerificationEmailData = {
  email: '',
};

export const RESET_PASSWORD_FORM_DEFAULT_VALUES: ResetPasswordData = {
  password: '',
  confirmPassword: '',
};

export const DEFAULT_AUTH_IMAGE = AuthImage;
