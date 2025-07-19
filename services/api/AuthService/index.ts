import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { AUTH_FORGOT_PASSWORD_PATH, AUTH_LOGIN_PATH, AUTH_RESET_PASSWORD_PATH } from '@/services/api/routes';
import { ForgotPasswordPayload, LoginPayload, LoginResponse, ResetPasswordPayload } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';

/**
 * AuthService handles authentication-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class AuthService extends BaseHttpClient {
  /**
   * Send login request to the API.
   * @param payload - LoginPayload object containing user credentials.
   *    - username: string // user's username
   *    - password: string // user's password
   * @returns Promise<any> - Resolves with response data from the API.
   */
  async login(payload: LoginPayload) {
    // POST request to login endpoint with user credentials
    return this.post<ApiResponse<LoginResponse>>(AUTH_LOGIN_PATH, payload).then((res) => res.data);
  }

  async forgotPassword(payload: ForgotPasswordPayload) {
    return this.post<ApiResponse<null>>(AUTH_FORGOT_PASSWORD_PATH, payload).then((res) => res.data);
  }

  async resetPassword(payload: ResetPasswordPayload) {
    return this.post<ApiResponse<null>>(AUTH_RESET_PASSWORD_PATH, payload).then((res) => res.data);
  }
}
