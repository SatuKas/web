import ImageMeta from '@/assets/image/image-meta.png';
import LogoIcon from '@/assets/image/logo-icon.svg';
import LogoText from '@/assets/image/logo-text.svg';
import { SIDEBAR_MENU_ITEM } from './menu';

/**
 * The display name of the application.
 */
export const APP_NAME = 'My Cool App';

/**
 * Short description for the application, used in meta tags and general info.
 */
export const APP_DESCRIPTION = 'My Cool App Description';

/**
 * Logo assets for the application.
 * @property {string} icon - Path to the logo icon (SVG).
 * @property {string} text - Path to the logo text (SVG).
 */
export const APP_LOGO = {
  icon: LogoIcon.src,
  text: LogoText.src,
};

/**
 * Default image used for meta tags (Open Graph, etc).
 */
export const APP_IMAGE_META = ImageMeta.src;

/**
 * Configuration for authentication features.
 * @property {boolean} signUp - Enable/disable user registration.
 * @property {boolean} forgotPassword - Enable/disable forgot password feature.
 * @property {boolean} socialMedia - Enable/disable social media login.
 * @property {boolean} legalConscern - Enable/disable legal concern agreement (e.g., terms & conditions).
 */
export const AUTH_CONFIG = {
  signUp: true,
  forgotPassword: true,
  socialMedia: false,
  legalConscern: true,
};

/**
 * Sidebar menu items for the application.
 * Imported from config/menu.ts.
 */
export const APP_SIDEBAR_MENU = SIDEBAR_MENU_ITEM;

export const APP_COUNTDOWN_SECONDS = 60;
