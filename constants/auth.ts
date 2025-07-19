import AuthImage from '@/assets/image/auth-default-image.svg';
import { ForgotPasswordData, LoginData, RegisterData } from '@/types/client/auth';

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

export const DEFAULT_AUTH_IMAGE = AuthImage;
