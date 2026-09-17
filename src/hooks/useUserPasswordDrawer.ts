import { updatePassword } from "../services/updatePassword.service";
import type { PasswordFormData } from "../shared/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
interface UseUserPasswordDrawer {
  userId: number;
  onOpenChange: (open: boolean) => void;
}
export const useUserPasswordDrawer = ({
  userId,
  onOpenChange,
}: UseUserPasswordDrawer) => {
  console.log("hook", userId);

  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "La contraseña debe tener entre 8 y 128 caracteres")
      .max(128, "La contraseña debe tener entre 8 y 128 caracteres")
      .required("La contraseña es obligatoria"),

    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("Debes confirmar la contraseña"),
  });
  const initialValues: PasswordFormData = {
    password: "",
    repassword: "",
  };

  const mutation = useMutation({
    mutationFn: (password: string) => {
      return updatePassword(userId, password);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // Cierra el Sheet
      onOpenChange(false);
      toast.success("Contraseña Actualizada", {
        description: "Contraseña actualizada con exito",
        duration: 3000,
      });
    },

    onError: () => {
      setErrorMessage("No se puedo actualizar la contraseña");
    },
  });

  const formik = useFormik<PasswordFormData>({
    initialValues,
    enableReinitialize: true,
    validationSchema,

    onSubmit: (values) => {
      setErrorMessage("");

      mutation.mutate(values.password);
    },
  });
  const handleClose = () => {
    formik.resetForm();
    setErrorMessage("");
    onOpenChange(false);
  };

  return {
    formik,
    errorMessage,
    setErrorMessage,
    isPending: mutation.isPending,
    handleClose,
  };
};
