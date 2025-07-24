/**
 * Type for user login data.
 */
export type LoginData = {
  username: string; // user's username
  password: string; // user's password (plain text, will be handled securely on backend)
};

/**
 * Type for user registration data.
 */
export type RegisterData = {
  name: string; // user's full name
  username: string; // unique username for the user
  email: string; // user's email address
  password: string; // password for account creation
  confirmPassword: string; // must match password, used for validation on frontend
};

export type ForgotPasswordData = {
  email: string;
};

export type ResetPasswordData = {
  password: string;
  confirmPassword: string;
};

export type ResendVerificationEmailData = ForgotPasswordData;
