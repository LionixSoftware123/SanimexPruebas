export type GoogleUserType = {
  sub?: string;
  id?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
};

export type FacebookUserType = {
  id?: string;
  name?: string;
  email?: string;
  picture?: {
    data?: {
      url?: string;
    };
  };
};

export enum AuthStep {
  authEmail = 'AUTH_EMAIL',
  authRegister = 'AUTH_REGISTER',
  authResetPassword = 'AUTH_RESET_PASSWORD',
  authForgotPassword = 'AUTH_FORGOT_PASSWORD',
  authLogin = 'AUTH_LOGIN',
  authHome = 'AUTH_HOME',
  authForgotPasswordNotFound = 'AUTH_FORGOT_PASSWORD_NOT_FOUND',
}
