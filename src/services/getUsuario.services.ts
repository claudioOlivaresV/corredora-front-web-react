import type { UserResponseTable } from "../shared/types/types";
import { api } from "../api/axiosApi";

export const getUsuario = async (): Promise<UserResponseTable[]> => {
  const response = await api.get<UserResponseTable[]>("/user");

  return response.data;
};
