import type { PropertyFormData } from "../../shared/types/types";

export const usePropertySubmit = (
  mutate: (values: PropertyFormData) => void,
) => {
  const submit = (values: PropertyFormData) => {
    const data: PropertyFormData = {
      address: values.address,
      description: values.description,
      monthly_rent: values.monthly_rent,
      owner_id: Number(values.owner_id),
      agent_id: Number(values.agent_id),
    };

    mutate(data);
  };

  return {
    submit,
  };
};
