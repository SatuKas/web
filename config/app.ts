import ImageMeta from '@/assets/image/image-meta.png';
import LogoIcon from '@/assets/image/logo-icon.svg';
import LogoText from '@/assets/image/logo-text.svg';
import { SIDEBAR_MENU_ITEM } from './menu';

export const APP_NAME = 'My Cool App';
export const APP_DESCRIPTION = 'My Cool App Description';

export const APP_LOGO = {
  icon: LogoIcon.src,
  text: LogoText.src,
};

export const APP_IMAGE_META = ImageMeta.src;

export const AUTH_CONFIG = {
  signUp: true,
  forgotPassword: true,
  socialMedia: true,
  legalConscern: true,
};

export const APP_SIDEBAR_MENU = SIDEBAR_MENU_ITEM;
