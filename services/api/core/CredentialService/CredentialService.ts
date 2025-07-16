'use client';

import env from '@/config/env';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cookie';
import { LOGIN_PATH_URL } from '@/constants/routes';
import { AuthCookie } from '@/libs/cookie/authCookie';
import * as ApiRoute from '@/services/api/routes';
import { RefreshTokenResponse } from '@/types/api/auth';
import { ApiResponse } from '@/types/api/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import AuthCredential, { TokenPayload } from './types/credential';

export class CredentialService implements AuthCredential {
  protected authStorage: AuthCookie; // handles storing and retrieving auth tokens from cookies
  private client: AxiosInstance; // axios instance for API requests
  readonly REFRESH_TOKEN_ENDPOINT = ApiRoute.AUTH_REFRESH_TOKEN_PATH; // endpoint for refreshing token
  readonly REVOKE_TOKEN_ENDPOINT = ApiRoute.AUTH_LOGOUT_PATH; // endpoint for revoking token

  readonly REFRESH_TOKEN_KEY = REFRESH_TOKEN_KEY; // key for refresh token in storage
  readonly ACCESS_TOKEN_KEY = ACCESS_TOKEN_KEY; // key for access token in storage

  constructor() {
    this.authStorage = new AuthCookie();
    this.client = axios.create({
      baseURL: env.BASE_API_URL + ApiRoute.getApiVersion(),
    });
  }

  /**
   * Request new access and refresh tokens using the current refresh token.
   * If the request fails (e.g. refresh token expired), will remove tokens from storage and throw error.
   *
   * @throws {AxiosError} Throws error if token refresh fails.
   */
  async requestNewTokens(): Promise<void> {
    try {
      const body = {
        refresh_token: this.authStorage.getAuthToken().refreshToken, // send current refresh token
      };
      const response = await this.client.post<ApiResponse<RefreshTokenResponse>>(this.REFRESH_TOKEN_ENDPOINT, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { data } = response.data;
      if (data.token) {
        // Save new tokens and their expiry to storage
        this.authStorage.setAuthToken({
          token: {
            accessToken: data.token.access_token, // new access token
            refreshToken: data.token.refresh_token, // new refresh token
          },
          expires: {
            accessToken: data.expires.access_token, // access token expiry
            refreshToken: data.expires.refresh_token, // refresh token expiry
          },
        });
      }
    } catch (error) {
      // Remove tokens if refresh fails (e.g. invalid/expired refresh token)
      this.authStorage.removeAuthToken();
      throw error;
    }
  }

  /**
   * Revoke (invalidate) the current access token on the server.
   * If the token is already invalid (401), just ignore the error.
   *
   * @private
   * @throws {AxiosError} Throws error if revoke fails for reasons other than 401.
   */
  private async revokeTokens(): Promise<void> {
    await this.client
      .post(
        this.REVOKE_TOKEN_ENDPOINT,
        {},
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${this.authStorage.getAuthToken().accessToken}`, // send current access token
          },
        }
      )
      .catch((error: AxiosError) => {
        // If the error is a 401, it means the token is already invalid
        // so we can just ignore it, otherwise, we can throw the error
        if (error.response?.status !== 401) {
          throw error;
        }
      });
  }

  /**
   * Logout handler.
   * Will revoke tokens on the server, remove tokens from storage, and optionally redirect to login page.
   *
   * @param {boolean} autoRedirect - If true, will redirect to login page after logout (default: true)
   */
  async logoutHandler(autoRedirect = true) {
    await this.revokeTokens()
      .then((res) => {
        // Logout success, just log info
        console.info('logout success from assessment', res);
      })
      .catch((error) => {
        // Log error but still continue to remove tokens and redirect
        console.error('logout error', error);
        return error;
      })
      .finally(() => {
        // Always remove tokens from storage
        this.authStorage.removeAuthToken();
        if (autoRedirect) {
          // Redirect to login page after logout
          window.open(LOGIN_PATH_URL, '_self');
        }
      });
  }

  /**
   * Save login tokens and expiry to storage.
   *
   * @param {TokenPayload} payload - contains token and expiry info
   *   - token: { accessToken: string; refreshToken: string }
   *   - expires: { accessToken: string; refreshToken: string }
   */
  loginHandler(payload: TokenPayload): void {
    this.authStorage.setAuthToken(payload);
  }

  /**
   * Get current access token from storage.
   *
   * @returns {string | null} access token string or null if not found
   */
  getAccessToken(): string | null {
    return this.authStorage.getAuthToken().accessToken;
  }
}
