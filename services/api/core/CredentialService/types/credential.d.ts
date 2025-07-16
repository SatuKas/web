/**
 * Interface representing credential management service.
 * Provides methods to handle access and refresh tokens.
 */
export default interface AuthCredential {
  /**
   * Retrieves the current access token.
   * @returns {string | null} The access token if available, otherwise null.
   */
  getAccessToken(): string | null;

  /**
   * Requests new access and refresh tokens.
   * @returns {Promise<void>} A promise that resolves when the tokens are successfully requested.
   */
  requestNewTokens(): Promise<void>;

  /**
   * The handler function to be called on logout.
   */
  logoutHandler(): Promise<void>;

  /**
   * The handler function to be called on login.
   */
  loginHandler(payload: TokenPayload): void;
}

export type TokenPayload = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  expires: {
    accessToken: number;
    refreshToken: number;
  };
};
