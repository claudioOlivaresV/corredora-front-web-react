import type { LayoutDashboard } from "lucide-react";

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
  password?: string;
  role: string;
}

export interface ErrorStateProps {
  onRetry: () => void;
  isRetrying?: boolean;
}
export interface UserResponseTable {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  created_at: string;
}
export interface CreateEditUser {
  id?: number;
  email: string;
  name: string;
  role_id: number;
  password?: string;
}

export const roleMap: Record<string, number> = {
  CORREDOR: 2,
  ARRENDADOR: 3,
  ARRENDATARIO: 4,
};

export interface IResponseCreateUser {
  id: number;
  name: string;
  email: string;
  role_id: number;
  active: boolean;
  created_at: string;
}

export interface PasswordFormData {
  password: string;
  repassword: string;
}
export interface MessageResponse {
  message: string;
}

export interface MenuItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  roles: UserRole[];
}
export type PropertyStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE";
export interface PropertyResponse {
  id: number;
  address: string;
  description: string;
  monthly_rent: number;
  status: PropertyStatus;
  owner_id: number;
  agent_id: number;
  created_at: string;
}

export interface PropertyFormData {
  address: string;
  description: string;
  monthly_rent: number | null;
  owner_id: number;
  agent_id: number;
}
export interface PropertyById {
  id: number;
  address: string;
  description: string;
  monthly_rent: number;
  status: string;
  owner_id: number;
  agent_id: number;
  created_at: string;
  contracts: Contract[];
}

export interface Contract {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
}
export interface ContractDetail {
  id: number;
  start_date: Date;
  end_date: Date;
  monthly_rent: string;
  status: string;
  property: Property;
  tenant: UserInfo;
  payments: Payment[];
}

export interface Payment {
  id: number;
  contract_id: number;
  due_date: Date;
  amount: string;
  paid_at: Date | null;
  status: StatusContract;
  created_at: Date;
}

export type StatusContract = "ACTIVE" | "FINISHED" | "CANCELLED";

export interface Property {
  id: number;
  address: string;
  description: string;
  monthly_rent: string;
  status: string;
  owner: UserInfo;
  agent: UserInfo;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
