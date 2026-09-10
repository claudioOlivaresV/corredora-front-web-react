import { useFormik } from "formik";
import * as Yup from "yup";

import { useLogin } from "./useLogin";

interface LoginForm {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const { login, isLoading, isError } = useLogin();

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .required("El correo es obligatorio")
        .max(150, "El email no puede superar los 150 caracteres")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Ingresa un correo válido"),

      password: Yup.string()
        .min(8, "La contraseña debe tener entre 8 y 128 caracteres")
        .max(128, "La contraseña debe tener entre 8 y 128 caracteres")
        .required("La contraseña es obligatoria"),
    }),

    onSubmit: (values) => {
      login(values);
    },
  });

  return {
    formik,
    isLoading,
    isError,
  };
};
