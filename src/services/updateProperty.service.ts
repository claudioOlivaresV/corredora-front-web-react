import { api } from "../api/axiosApi";
import type { PropertyFormData } from "../shared/types/types";

export const updateProperty = async (
  data: PropertyFormData,
  id: string,
): Promise<PropertyFormData> => {
  const response = await api.patch<PropertyFormData>(`/properties/${id}`, data);

  return response.data;
};
