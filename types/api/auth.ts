/**
 * Payload for login API request
 */
export type LoginPayload = {
  email: string; // user's email address
  password: string; // user's password
  device_id?: string; // device id
};

/**
 * Payload for forgot password API request
 */
export type ForgotPasswordPayload = {
  email: string; // user's email address to send the reset link
};

/**
 * Payload for reset password API request
 */
export type ResetPasswordPayload = {
  token: string; // token received from forgot password email
  password: string; // new password to be set
};

/**
 * Payload for user registration API request
 */
export type RegisterPayload = {
  email: string; // user's email address
  password: string; // user's password
  name: string; // user's full name
  username: string; // unique username for the user
};

/**
 * Payload for resending verification email API request
 */
export type ResendVerificationEmailPayload = {
  email: string; // user's email address to resend the verification link
};

/**
 * Payload for verifying email API request
 */
export type VerifyEmailPayload = {
  token: string; // verification token sent to user's email
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
export type RegisterResponse = Pick<LoginResponse, 'id'>;

/**
 * Response for refreshing access token
 * Only contains new token info
 */
export type RefreshTokenResponse = TokenResponse;
