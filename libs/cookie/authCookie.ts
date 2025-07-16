import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cookie';
import { TokenPayload } from '@/services/api/core/CredentialService/types/credential';
import { CookieStorage } from './cookie';

export class AuthCookie extends CookieStorage {
  constructor() {
    super();
  }

  private setAuthTokenExpires(payload: TokenPayload) {
    const now = new Date();
    return {
      accessToken: new Date(now.getTime() + payload.expires.accessToken),
      refreshToken: new Date(now.getTime() + payload.expires.refreshToken),
    };
  }

  setAuthToken(payload: TokenPayload) {
    const expires = this.setAuthTokenExpires(payload);
    this.setItem(ACCESS_TOKEN_KEY, payload.token.accessToken, {
      expires: expires.accessToken,
    });
    this.setItem(REFRESH_TOKEN_KEY, payload.token.refreshToken, {
      expires: expires.refreshToken,
    });
  }

  removeAuthToken() {
    this.removeItem(ACCESS_TOKEN_KEY);
    this.removeItem(REFRESH_TOKEN_KEY);
  }

  getAuthToken() {
    return {
      accessToken: this.getItem(ACCESS_TOKEN_KEY),
      refreshToken: this.getItem(REFRESH_TOKEN_KEY),
    };
  }
}
