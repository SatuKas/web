/**
 * API Payload
 */

export type LoginPayload = {
  email: string;
  password: string;
};

/**
 * API Response
 */

type TokenResponse = {
  token: {
    access_token: string;
    refresh_token: string;
  };
  expires: {
    access_token: number;
    refresh_token: number;
  };
};

export type LoginResponse = TokenResponse & {
  id: string;
};

export type RegisterResponse = LoginResponse;

export type RefreshTokenResponse = TokenResponse;
