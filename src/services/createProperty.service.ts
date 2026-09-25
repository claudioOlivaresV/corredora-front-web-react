import { api } from "../api/axiosApi";
import type { PropertyFormData } from "../shared/types/types";

export const createProperty = async (
  data: PropertyFormData,
): Promise<PropertyFormData> => {
  const response = await api.post<PropertyFormData>("/properties", data);

  return response.data;
};
