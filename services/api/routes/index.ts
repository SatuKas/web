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
export const AUTH_VERIFY_EMAIL_PATH = `${AUTH_PATH}/verify-email`;
export const AUTH_FORGOT_PASSWORD_PATH = `${AUTH_PATH}/forgot-password`;
export const AUTH_RESET_PASSWORD_PATH = `${AUTH_PATH}/reset-password`;
export const AUTH_RESEND_VERIFICATION_EMAIL_PATH = `${AUTH_PATH}/resend-verification`;

// User Path
export const USER_PATH = '/user';
export const USER_CURRENT_PATH = `${USER_PATH}/me`;

// Book Path
export const BOOK_PATH = '/books';
export const BOOK_LIST_PATH = `${BOOK_PATH}`;
export const BOOK_SHARED_LIST_PATH = `${BOOK_PATH}/shared`;
export const BOOK_GET_BY_ID_PATH = `${BOOK_PATH}/:bookId`;
export const BOOK_CREATE_PATH = `${BOOK_PATH}`;
export const BOOK_DELETE_PATH = `${BOOK_PATH}/:bookId`;

// Coa Path
export const COA_PATH = '/accounts';
export const COA_LIST_PATH = `${COA_PATH}`;
export const COA_CREATE_PATH = `${COA_PATH}`;
export const COA_UPDATE_PATH = `${COA_PATH}/:accountId`;
export const COA_DELETE_PATH = `${COA_PATH}/:accountId`;

// Transaction Path
export const TRANSACTION_PATH = '/transactions';
export const TRANSACTION_ENTRY_PATH = `${TRANSACTION_PATH}/entry`;

// Report Path
export const REPORT_PATH = '/reports';
export const REPORT_LEDGER_PATH = `${REPORT_PATH}/ledger`;
