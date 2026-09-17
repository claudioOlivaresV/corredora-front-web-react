import type { MessageResponse } from "@/shared/types/types";
import { api } from "../api/axiosApi";

export const updatePassword = async (
  id: number,
  password: string,
): Promise<MessageResponse> => {
  const response = await api.patch<MessageResponse>(`/user/${id}/password`, {
    password,
  });

  return response.data;
};
