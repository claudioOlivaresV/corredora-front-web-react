import { useFormik } from "formik";
import * as Yup from "yup";

import type { PropertyFormData } from "../../shared/types/types";

const initialValues: PropertyFormData = {
  address: "",
  description: "",
  monthly_rent: null,
  owner_id: 0,
  agent_id: 0,
};

const validationSchema = Yup.object({
  address: Yup.string()
    .required("La dirección es obligatoria")
    .min(3, "La dirección debe tener al menos 3 caracteres")
    .max(100, "La dirección como máximo 100 caracteres"),

  description: Yup.string()
    .max(250, "La descripción debe tener como máximo 250 caracteres")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .required("La descripción es obligatoria"),

  monthly_rent: Yup.number()
    .typeError("El monto debe ser un número")
    .required("El monto del arriendo es obligatorio")
    .moreThan(0, "El monto debe ser mayor a 0"),

  owner_id: Yup.number()
    .required("Selecciona un dueño de la propiedad")
    .moreThan(0, "Selecciona un dueño de la propiedad"),

  agent_id: Yup.number()
    .required("Selecciona un corredor")
    .moreThan(0, "Selecciona un corredor"),
});

export const usePropertyForm = (
  onSubmit: (values: PropertyFormData) => void,
) => {
  const formik = useFormik<PropertyFormData>({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema,

    onSubmit,
  });

  return formik;
};
