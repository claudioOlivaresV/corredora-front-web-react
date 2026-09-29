import type { PropertyById } from "../shared/types/types";
import { api } from "../api/axiosApi";

export const getPropertyDetail = async (id: string): Promise<PropertyById> => {
  const response = await api.get<PropertyById>(`/properties/${id}`);

  return response.data;
};
