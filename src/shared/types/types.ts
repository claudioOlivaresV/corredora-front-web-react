export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}
export type LoginResponse = {
  token: string;
  user: User;
};
export type RequestLogin = {
  email: string;
  password: string;
};
