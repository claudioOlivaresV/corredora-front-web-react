import { api } from "../api/axiosApi";
import type {
  CreateEditUser,
  IResponseCreateUser,
} from "../shared/types/types";

export const updateUser = async (
  id: string,
  data: CreateEditUser,
): Promise<IResponseCreateUser> => {
  const response = await api.patch<IResponseCreateUser>(`/user/${id}`, data);

  return response.data;
};
