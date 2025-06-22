import AuthImage from '@/assets/image/auth-default-image.svg';
import { LoginPayload } from '@/types/client/auth';

export const LOGIN_FORM_DEFAULT_VALUES: LoginPayload = {
  email: '',
  password: '',
};

export const DEFAULT_AUTH_IMAGE = AuthImage;
