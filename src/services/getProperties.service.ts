import type { PropertyResponse } from "../shared/types/types";
import { api } from "../api/axiosApi";

export const getProperties = async (): Promise<PropertyResponse[]> => {
  const response = await api.get<PropertyResponse[]>("/properties");

  return response.data;
};
