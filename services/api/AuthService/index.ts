import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { AUTH_LOGIN_PATH } from '@/services/api/routes';
import { LoginPayload } from '@/types/api/auth';

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
    return this.post(AUTH_LOGIN_PATH, payload).then((res: any) => res.data);
  }
}
