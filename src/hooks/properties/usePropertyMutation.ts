import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createProperty } from "../../services/createProperty.service";
import type { PropertyFormData } from "../../shared/types/types";

interface UsePropertyMutationProps {
  isEdit: boolean;
  onSuccess: () => void;
}

export const usePropertyMutation = ({
  isEdit,
  onSuccess,
}: UsePropertyMutationProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: PropertyFormData) => {
      return createProperty(values);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      toast.success(
        isEdit
          ? "Propiedad actualizada correctamente"
          : "Propiedad creada correctamente",
        {
          description: isEdit
            ? "Los datos de la propiedad fueron actualizados."
            : "La propiedad fue registrada en el sistema.",
          duration: 3000,
        },
      );

      onSuccess();
    },
  });

  return {
    createProperty: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
