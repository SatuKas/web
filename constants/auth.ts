import AuthImage from '@/assets/image/auth-default-image.svg';
import { LoginPayload, RegisterPayload } from '@/types/client/auth';

export const LOGIN_FORM_DEFAULT_VALUES: LoginPayload = {
  email: '',
  password: '',
};

export const REGISTER_FORM_DEFAULT_VALUES: RegisterPayload = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const DEFAULT_AUTH_IMAGE = AuthImage;
