import axios from "axios";

export const healthCheck = async (): Promise<void> => {
  await axios.get(`/health`);
};
