import ImageMeta from '@/assets/image/image-meta.png';
import LogoIconColor from '@/assets/image/logo-icon-color.svg';
import LogoIconDark from '@/assets/image/logo-icon-dark.svg';
import LogoIconLight from '@/assets/image/logo-icon-light.svg';
import LogoIconSquare from '@/assets/image/logo-icon-square.svg';
import LogoTextDark from '@/assets/image/logo-text-dark.svg';
import LogoTextLight from '@/assets/image/logo-text-light.svg';
import { AppLogo } from '@/types/client/ui';
import { sidebarBookDashboardMenuItem } from './menu/bookDashboardMenu';
import { SIDEBAR_COMMON_MENU_ITEM } from './menu/commonMenu';

/**
 * The display name of the application.
 */
export const APP_NAME = 'SatuKas';

/**
 * Short description for the application, used in meta tags and general info.
 */
export const APP_DESCRIPTION = 'Satu tempat untuk semua kebutuhan finansial Anda.';

/**
 * Logo assets for the application.
 * @property {string} icon - Path to the logo icon (SVG).
 * @property {string} text - Path to the logo text (SVG).
 */
export const APP_LOGO: AppLogo = {
  icon: {
    light: LogoIconLight.src,
    dark: LogoIconDark.src,
    square: LogoIconSquare.src,
    color: LogoIconColor.src,
  },
  text: {
    light: LogoTextLight.src,
    dark: LogoTextDark.src,
  },
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
 * Imported from config/menu.
 */
export const APP_SIDEBAR_BOOK_DASHBOARD_MENU = sidebarBookDashboardMenuItem;
export const APP_SIDEBAR_COMMON_MENU = SIDEBAR_COMMON_MENU_ITEM;

export const APP_COUNTDOWN_SECONDS = 60;
