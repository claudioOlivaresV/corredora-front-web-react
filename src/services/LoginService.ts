import { api } from "../api/axiosApi";
import type { LoginResponse, RequestLogin } from "../shared/types/types";

export const loginRequest = async (
  data: RequestLogin,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);

  return response.data;
};
