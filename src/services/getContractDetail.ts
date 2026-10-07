import type { ContractDetail } from "../shared/types/types";
import { api } from "../api/axiosApi";

export const getContractDetail = async (
  id: string,
): Promise<ContractDetail[]> => {
  const response = await api.get<ContractDetail[]>(`/contracts/${id}`);

  return response.data;
};
