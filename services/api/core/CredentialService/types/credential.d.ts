/**
 * AuthCredential interface handles the management of authentication credentials,
 * including access and refresh tokens. Use this interface to interact with token storage,
 * renewal, and authentication event handlers.
 */
export default interface AuthCredential {
  /**
   * Get the current access token from storage or memory.
   * Returns null if the token is not available or expired.
   */
  getAccessToken(): string | null;

  /**
   * Request new access and refresh tokens, usually by calling the authentication API.
   * Should be called when tokens are expired or invalid.
   * Returns a promise that resolves when the operation is complete.
   */
  requestNewTokens(): Promise<void>;

  /**
   * Handler to be executed during logout.
   * Should clear tokens and perform any necessary cleanup.
   */
  logoutHandler(): Promise<void>;

  /**
   * Handler to be executed after successful login.
   * Accepts a TokenPayload containing new tokens and their expiry times.
   * Should store tokens and set up any required state.
   */
  loginHandler(payload: TokenPayload): void;
}

/**
 * TokenPayload type contains the tokens and their expiry information.
 */
export type TokenPayload = {
  token: {
    accessToken: string; // JWT or access token string
    refreshToken: string; // refresh token string
  };
  expires: {
    accessToken: number; // access token expiry timestamp (in seconds or ms, depending on implementation)
    refreshToken: number; // refresh token expiry timestamp (in seconds or ms, depending on implementation)
  };
};
