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
  protected authStorage: AuthCookie;
  private client: AxiosInstance;
  readonly REFRESH_TOKEN_ENDPOINT = ApiRoute.AUTH_REFRESH_TOKEN_PATH;
  readonly REVOKE_TOKEN_ENDPOINT = ApiRoute.AUTH_LOGOUT_PATH;

  readonly REFRESH_TOKEN_KEY = REFRESH_TOKEN_KEY;
  readonly ACCESS_TOKEN_KEY = ACCESS_TOKEN_KEY;

  constructor() {
    this.authStorage = new AuthCookie();
    this.client = axios.create({
      baseURL: env.BASE_API_URL + ApiRoute.getApiVersion(),
    });
  }

  /**
   * Requests new tokens using the refresh token.
   * @throws Will throw an error if the request fails.
   */
  async requestNewTokens(): Promise<void> {
    try {
      const body = {
        refresh_token: this.authStorage.getAuthToken().refreshToken,
      };
      const response = await this.client.post<ApiResponse<RefreshTokenResponse>>(this.REFRESH_TOKEN_ENDPOINT, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { data } = response.data;
      if (data.token) {
        this.authStorage.setAuthToken({
          token: {
            accessToken: data.token.access_token,
            refreshToken: data.token.refresh_token,
          },
          expires: {
            accessToken: data.expires.access_token,
            refreshToken: data.expires.refresh_token,
          },
        });
      }
    } catch (error) {
      this.authStorage.removeAuthToken();
      throw error;
    }
  }

  /**
   * Revokes the current tokens.
   * @throws Will throw an error if the request fails.
   */
  private async revokeTokens(): Promise<void> {
    await this.client
      .post(
        this.REVOKE_TOKEN_ENDPOINT,
        {},
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${this.authStorage.getAuthToken().accessToken}`,
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
   * The handler function to be called on logout.
   */
  async logoutHandler(autoRedirect = true) {
    await this.revokeTokens()
      .then((res) => {
        console.info('logout success from assessment', res);
      })
      .catch((error) => {
        console.error('logout error', error);
        return error;
      })
      .finally(() => {
        this.authStorage.removeAuthToken();
        if (autoRedirect) {
          window.open(LOGIN_PATH_URL, '_self');
        }
      });
  }

  loginHandler(payload: TokenPayload): void {
    this.authStorage.setAuthToken(payload);
  }

  getAccessToken(): string | null {
    return this.authStorage.getAuthToken().accessToken;
  }
}
