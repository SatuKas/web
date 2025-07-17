import { ACCESS_TOKEN_KEY, DEVICE_ID_KEY, REFRESH_TOKEN_KEY } from '@/constants/cookie';
import { TokenPayload } from '@/services/api/core/CredentialService/types/credential';
import { CookieStorage } from './cookie';

/**
 * AuthCookie handles storing, retrieving, and removing authentication tokens in cookies.
 * Extends CookieStorage for cookie operations.
 */
export class AuthCookie extends CookieStorage {
  constructor() {
    super();
  }

  /**
   * Calculate the expiration dates for access and refresh tokens.
   * @param payload - TokenPayload object containing token and expires info.
   *   - token: { accessToken: string; refreshToken: string }
   *   - expires: { accessToken: number; refreshToken: number } // in milliseconds
   * @returns Object with accessToken and refreshToken expiration Date.
   */
  private setAuthTokenExpires(payload: TokenPayload) {
    const now = new Date();
    // Calculate expiration by adding the duration (in ms) to current time
    return {
      accessToken: new Date(now.getTime() + payload.expires.accessToken),
      refreshToken: new Date(now.getTime() + payload.expires.refreshToken),
    };
  }

  /**
   * Store access and refresh tokens in cookies with their respective expiration dates.
   * @param payload - TokenPayload object containing token and expires info.
   */
  setAuthToken(payload: TokenPayload) {
    const expires = this.setAuthTokenExpires(payload);
    // Set access token cookie
    this.setItem(ACCESS_TOKEN_KEY, payload.token.accessToken, {
      expires: expires.accessToken,
    });
    // Set refresh token cookie
    this.setItem(REFRESH_TOKEN_KEY, payload.token.refreshToken, {
      expires: expires.refreshToken,
    });

    if (payload.device) {
      this.setItem(DEVICE_ID_KEY, payload.device);
    }
  }

  /**
   * Remove both access and refresh tokens from cookies.
   */
  removeAuthToken() {
    this.removeItem(ACCESS_TOKEN_KEY);
    this.removeItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Retrieve access and refresh tokens from cookies.
   * @returns Object containing accessToken and refreshToken string values.
   */
  getAuthToken() {
    return {
      accessToken: this.getItem(ACCESS_TOKEN_KEY), // string | undefined
      refreshToken: this.getItem(REFRESH_TOKEN_KEY), // string | undefined
      device: this.getItem(DEVICE_ID_KEY), // string | undefined
    };
  }
}
