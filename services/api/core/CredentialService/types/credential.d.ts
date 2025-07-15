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
   * Retrieves the current refresh token.
   * @returns {string | null} The refresh token if available, otherwise null.
   */
  getRefreshToken(): string | null;

  /**
   * Requests new access and refresh tokens.
   * @returns {Promise<void>} A promise that resolves when the tokens are successfully requested.
   */
  requestNewTokens(): Promise<void>;

  /**
   * Revokes the current access and refresh tokens.
   * @returns {Promise<void>} A promise that resolves when the tokens are successfully revoked.
   */
  revokeTokens(): Promise<void>;
}
