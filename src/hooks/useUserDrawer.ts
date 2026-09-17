import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  roleMap,
  type CreateEditUser,
  type UserFormData,
  type UserResponseTable,
} from "../shared/types/types";

import { createUser } from "../services/createUser.service";
import { updateUser } from "../services/updateUser.service";

interface UseUserDrawerProps {
  user?: UserResponseTable;
  onOpenChange: (open: boolean) => void;
}

export const useUserDrawer = ({ user, onOpenChange }: UseUserDrawerProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const isEdit = Boolean(user);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre debe tener como máximo 100 caracteres"),

    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Ingresa un correo válido")
      .max(100, "El correo debe tener como máximo 100 caracteres")
      .required("El correo es obligatorio"),

    password: isEdit
      ? Yup.string().notRequired()
      : Yup.string()
          .min(8, "La contraseña debe tener al menos 8 caracteres")
          .max(30, "La contraseña debe tener como máximo 30 caracteres")
          .required("La contraseña es obligatoria"),

    role: Yup.string().required("Selecciona un rol"),
  });

  const initialValues: UserFormData = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    role: user?.role ?? "",
  };

  const mutation = useMutation({
    mutationFn: (values: CreateEditUser) => {
      if (isEdit && user) {
        return updateUser(String(user.id), values);
      }

      return createUser(values);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // Cierra el Sheet
      onOpenChange(false);

      toast.success(
        isEdit
          ? "Usuario actualizado correctamente"
          : "Usuario creado correctamente",
        {
          description: isEdit
            ? "Los datos del usuario fueron actualizados."
            : "El usuario fue registrado en el sistema.",
          duration: 3000,
        },
      );
    },

    onError: () => {
      setErrorMessage(
        isEdit
          ? "No se pudo actualizar el usuario. Intenta nuevamente."
          : "No se pudo crear el usuario. Intenta nuevamente.",
      );
    },
  });

  const formik = useFormik<UserFormData>({
    initialValues,
    enableReinitialize: true,
    validationSchema,

    onSubmit: (values) => {
      setErrorMessage("");

      const data: CreateEditUser = {
        name: values.name,
        email: values.email,
        role_id: roleMap[values.role],
        ...(values.password && {
          password: values.password,
        }),
      };

      mutation.mutate(data);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setErrorMessage("");
    onOpenChange(false);
  };

  return {
    formik,
    isEdit,
    errorMessage,
    isPending: mutation.isPending,
    handleClose,
  };
};
