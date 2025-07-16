import AuthImage from '@/assets/image/auth-default-image.svg';
import { LoginData, RegisterData } from '@/types/client/auth';

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

export const DEFAULT_AUTH_IMAGE = AuthImage;
