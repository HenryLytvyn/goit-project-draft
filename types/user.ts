export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

export interface AuthResponse {
  user: User;
  message?: string;
}
