export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type ResetPasswordRequest = {
  email: string;
};

export type SendResetEmailRequest = {
  email: string;
};
