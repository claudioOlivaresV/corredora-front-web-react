import { useFormik } from "formik";
import * as Yup from "yup";

import type {
  PropertyFormData,
  PropertyResponse,
} from "../../shared/types/types";

export const usePropertyForm = (
  property: PropertyResponse,
  onSubmit: (values: PropertyFormData) => void,
  isAdmin: boolean,
) => {
  const isEdit = Boolean(property);

  const initialValues: PropertyFormData = {
    address: isEdit ? property.address : "",
    description: isEdit ? property.description : "",
    monthly_rent: isEdit ? property.monthly_rent : null,
    owner_id: isEdit ? property.owner_id : 0,
    agent_id: isEdit ? property.agent_id : 0,
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

    agent_id: !isAdmin
      ? Yup.string().notRequired()
      : Yup.number()
          .required("Selecciona un corredor")
          .moreThan(0, "Selecciona un corredor"),
  });
  const formik = useFormik<PropertyFormData>({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema,

    onSubmit,
  });

  return formik;
};
