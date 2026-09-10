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
export type UserRole = "ADMIN" | "CORREDOR" | "ARRENDADOR" | "ARRENDATARIO";

export type UserStatus = "ACTIVO" | "INACTIVO" | "PENDIENTE";

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
