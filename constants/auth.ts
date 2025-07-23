import AuthImage from '@/assets/image/auth-illustration.jpg';
import { ForgotPasswordData, LoginData, RegisterData, ResetPasswordData } from '@/types/client/auth';

export const LOGIN_FORM_DEFAULT_VALUES: LoginData = {
  email: '',
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

export const RESET_PASSWORD_FORM_DEFAULT_VALUES: ResetPasswordData = {
  password: '',
  confirmPassword: '',
};

export const DEFAULT_AUTH_IMAGE = AuthImage;
