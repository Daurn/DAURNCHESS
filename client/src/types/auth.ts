export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  username: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type User = {
  id: string;
  username: string;
  email: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
