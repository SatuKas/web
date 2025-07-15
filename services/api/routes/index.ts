/**
 * API endpoint routes definition
 */

import { ApiVersion } from '@/types/api/common';

export const getApiVersion = (version: ApiVersion = ApiVersion.V1) => {
  return `/api/${version}`;
};

// Auth Path
export const AUTH_PATH = '/auth';
export const AUTH_LOGIN_PATH = `${AUTH_PATH}/login`;
export const AUTH_REGISTER_PATH = `${AUTH_PATH}/register`;
export const AUTH_LOGOUT_PATH = `${AUTH_PATH}/logout`;
export const AUTH_REFRESH_TOKEN_PATH = `${AUTH_PATH}/refresh-token`;
export const AUTH_VERIFY_EMAIL_PATH = `${AUTH_PATH}/verify-email/:token`;
export const AUTH_FORGOT_PASSWORD_PATH = `${AUTH_PATH}/forgot-password`;
export const AUTH_RESET_PASSWORD_PATH = `${AUTH_PATH}/reset-password/:token`;
