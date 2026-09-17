import type { IResponseCreateUser } from "../shared/types/types";
import { api } from "../api/axiosApi";

export const unblockUser = async (id: number): Promise<IResponseCreateUser> => {
  const response = await api.patch<IResponseCreateUser>(`/user/${id}/activate`);

  return response.data;
};
