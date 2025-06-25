export interface BaseUser {
  id: string;
  username: string;
  email: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseUser {
  password: string;
}

export type AuthUser = BaseUser;

export interface AuthPayload {
  user: AuthUser;
  token: string;
}

export interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}
