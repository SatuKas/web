/**
 * Payload for login API request
 */
export type LoginPayload = {
  email: string; // user's email address
  password: string; // user's password
  device_id?: string; // device id
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

/**
 * Common structure for token-related API responses
 */
type TokenResponse = {
  token: {
    access_token: string; // JWT access token for authentication
    refresh_token: string; // JWT refresh token for obtaining new access token
  };
  expires: {
    access_token: number; // access token expiration time (in seconds or timestamp, depends on backend)
    refresh_token: number; // refresh token expiration time (in seconds or timestamp, depends on backend)
  };
};

/**
 * Response for successful login
 * Combines token info and user id
 */
export type LoginResponse = TokenResponse & {
  id: string; // unique user identifier
  device: string; // device id
};

/**
 * Response for successful registration
 * Same structure as LoginResponse
 */
export type RegisterResponse = LoginResponse;

/**
 * Response for refreshing access token
 * Only contains new token info
 */
export type RefreshTokenResponse = TokenResponse;
