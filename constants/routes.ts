/**
 * This file contains the routes for the application.
 * It is used to navigate between the pages of the application.
 * It is also used to validate the routes of the application.
 */

// Landing Page Routes
export const LANDING_PAGE_PATH_URL = '/';

// Legal Routes
export const LEGAL_PATH_URL = '/legal';
export const TERMS_PATH_URL = `${LEGAL_PATH_URL}/terms`;
export const PRIVACY_PATH_URL = `${LEGAL_PATH_URL}/privacy`;

// About Routes
export const ABOUT_PATH_URL = '/about';

// Contact Routes
export const CONTACT_PATH_URL = '/contact';

// Auth Routes
export const AUTH_PATH_URL = '/auth';
export const LOGIN_PATH_URL = `${AUTH_PATH_URL}/login`;
export const REGISTER_PATH_URL = `${AUTH_PATH_URL}/register`;
export const FORGOT_PASSWORD_PATH_URL = `${AUTH_PATH_URL}/forgot-password`;
export const RESET_PASSWORD_PATH_URL = `${AUTH_PATH_URL}/reset-password`;
export const VERIFY_EMAIL_PATH_URL = `${AUTH_PATH_URL}/verify-email`;

// Dashboard Routes
export const DASHBOARD_PATH_URL = '/workspace';
export const DASHBOARD_BOOKS_PATH_URL = `${DASHBOARD_PATH_URL}/books`;
export const DASHBOARD_ORGANIZATIONS_PATH_URL = `${DASHBOARD_PATH_URL}/organizations`;

// Settings Routes
export const SETTINGS_PATH_URL = '/settings';
export const ACCOUNT_SETTINGS_PATH_URL = `${SETTINGS_PATH_URL}/account`;

// Book Routes
export const BOOK_PATH_URL = '/book/:username/:bookId';
export const BOOK_DASHBOARD_PATH_URL = `${BOOK_PATH_URL}/dashboard`;

export const DUMMY_PATH_URL = '/not-found';

// Public Routes
export const PUBLIC_AUTH_ROUTES = [LOGIN_PATH_URL, REGISTER_PATH_URL];
export const PUBLIC_ROUTES = [
  ABOUT_PATH_URL,
  CONTACT_PATH_URL,
  LANDING_PAGE_PATH_URL,
  LEGAL_PATH_URL,
  FORGOT_PASSWORD_PATH_URL,
  RESET_PASSWORD_PATH_URL,
  VERIFY_EMAIL_PATH_URL,
];
