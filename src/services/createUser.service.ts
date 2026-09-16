import { api } from "../api/axiosApi";
import type {
  CreateEditUser,
  IResponseCreateUser,
} from "../shared/types/types";

export const createUser = async (
  data: CreateEditUser,
): Promise<IResponseCreateUser> => {
  const response = await api.post<IResponseCreateUser>("/user", data);

  return response.data;
};
