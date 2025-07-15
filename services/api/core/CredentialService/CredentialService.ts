import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cookieKey';
import axios, { AxiosError } from 'axios';
import AuthCredential from './types/credential';

type Config = {
  refreshTokenEndpoint: string;
  revokeTokenEndpoint: string;
  storage: Storage;
};

/**
 * Service for handling credentials such as access and refresh tokens.
 * Implements the ICredential interface.
 */
export class CredentialService implements AuthCredential {
  protected storage: Storage;
  protected refreshTokenEndpoint: string;
  protected revokeTokenEndpoint: string;

  readonly REFRESH_TOKEN_KEY = REFRESH_TOKEN_KEY;
  readonly ACCESS_TOKEN_KEY = ACCESS_TOKEN_KEY;

  /**
   * Constructs a new CredentialService instance.
   * @param storage - The storage mechanism to use for storing tokens.
   * @param refreshTokenEndpoint - The endpoint to request new tokens.
   * @param revokeTokenEndpoint - The endpoint to revoke tokens.
   */
  constructor({ storage, refreshTokenEndpoint, revokeTokenEndpoint }: Config) {
    this.storage = storage;
    this.refreshTokenEndpoint = refreshTokenEndpoint;
    this.revokeTokenEndpoint = revokeTokenEndpoint;
  }

  getAccessToken(): string | null {
    return this.storage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.storage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Requests new tokens using the refresh token.
   * @throws Will throw an error if the request fails.
   */
  async requestNewTokens(): Promise<void> {
    try {
      const body = {
        refresh_token: this.getRefreshToken(),
      };
      const response = await axios.post(this.refreshTokenEndpoint, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { data } = response.data;
      if (data.access) {
        this.setAccessToken(data.access);
      }
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  /**
   * Revokes the current tokens.
   * @throws Will throw an error if the request fails.
   */
  async revokeTokens(): Promise<void> {
    await axios
      .post(
        this.revokeTokenEndpoint,
        {},
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${this.getAccessToken()}`,
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

    this.clearTokens();
  }

  private removeAccessToken(): void {
    this.storage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  private setAccessToken(token: string): void {
    this.storage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  private removeRefreshToken(): void {
    this.storage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  private clearTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}
