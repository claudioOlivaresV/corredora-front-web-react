import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { useFormik } from "formik";
import { type PropertyFormData } from "../../shared/types/types";
import * as Yup from "yup";
import { cn } from "cn";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "../shared/ErrorMessage";
import { createProperty } from "../../services/createProperty.service";
import { usePropertyUsers } from "../../hooks/properties/usePropertyUsers";
import { useErrorMessage } from "../../hooks/shared/useErrorMessage";

interface ModalPropertiesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ModalProperties = ({
  open,
  onOpenChange,
}: ModalPropertiesProps) => {
  const isEdit = Boolean(false);
  const queryClient = useQueryClient();
  const { errorMessage, setError } = useErrorMessage();

  const { owners, agents } = usePropertyUsers();

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

      .required("La descripción es obligatorio"),
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

  const mutation = useMutation({
    mutationFn: (values: PropertyFormData) => {
      // if (isEdit) {
      //   return updateUser(String(user.id), values);
      // }

      return createProperty(values);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      // Cierra el Sheet
      handleClose();

      toast.success(
        isEdit
          ? "Propiedad actualizada correctamente"
          : "Propiedad creada correctamente",
        {
          description: isEdit
            ? "Los datos de la propiedad fueron actualizados."
            : "La propiedad fue registrado en el sistema.",
          duration: 3000,
        },
      );
    },

    onError: () => {
      setError(
        isEdit
          ? "No se pudo actualizar la propiedad. Intenta nuevamente."
          : "No se pudo crear la propiedad. Intenta nuevamente.",
      );
    },
  });
  const formik = useFormik<PropertyFormData>({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema,

    onSubmit: (values) => {
      // setErrorMessage("");

      const data: PropertyFormData = {
        address: values.address,
        description: values.description,
        monthly_rent: values.monthly_rent,
        owner_id: Number(values.owner_id),
        agent_id: Number(values.agent_id),
      };
      console.log("data enviada:", data);

      mutation.mutate(data);
    },
  });
  const handleClose = () => {
    formik.resetForm();
    setError("");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-surface-container-lowest p-8 shadow-2xl md:p-10">
        <DialogHeader className="mb-8 flex flex-col text-left">
          <DialogTitle className="font-display text-[28px] tracking-tight text-obsidian">
            Crear Nuevo Propiedad
          </DialogTitle>

          <DialogDescription className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Complete los campos necesarios para crear una propiedad.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* Property */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-wider text-obsidian"
            >
              Dirección
            </label>

            <input
              id="address"
              name="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                formik.touched.address &&
                  formik.errors.address &&
                  "border border-error",
              )}
              placeholder="Providencia 1267"
            />
            {formik.touched.address && formik.errors.address && (
              <span className="text-xs font-medium text-error">
                {formik.errors.address}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-wider text-obsidian"
            >
              Descripcion
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Casa de dos pisos"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                formik.touched.description &&
                  formik.errors.description &&
                  "border border-error",
              )}
            />
            {formik.touched.description && formik.errors.description && (
              <span className="text-xs font-medium text-error">
                {formik.errors.description}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="owner_id"
              className="text-xs font-semibold uppercase tracking-wider text-obsidian"
            >
              Dueño Propiedad
            </label>

            <select
              id="owner_id"
              name="owner_id"
              value={formik.values.owner_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                formik.touched.owner_id &&
                  formik.errors.owner_id &&
                  "border border-error",
              )}
            >
              <option value={0}>Selecciona Propietario</option>
              {owners?.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
            {formik.touched.owner_id && formik.errors.owner_id && (
              <span className="text-xs font-medium text-error">
                {formik.errors.owner_id}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="agent_id"
              className="text-xs font-semibold uppercase tracking-wider text-obsidian"
            >
              Corredor Asignado
            </label>

            <select
              id="agent_id"
              name="agent_id"
              value={formik.values.agent_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                formik.touched.agent_id &&
                  formik.errors.agent_id &&
                  "border border-error",
              )}
            >
              <option value={0}>Selecciona Corredor</option>
              {agents?.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
            {formik.touched.agent_id && formik.errors.agent_id && (
              <span className="text-xs font-medium text-error">
                {formik.errors.agent_id}
              </span>
            )}
          </div>

          {/* Monthly rent */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-wider text-obsidian"
            >
              Monto Mensual Arriendo
            </label>
            <input
              id="monthly_rent"
              name="monthly_rent"
              type="number"
              placeholder="Ej: 6400"
              value={formik.values.monthly_rent ?? ""}
              onChange={(event) => {
                const value = event.target.value;

                formik.setFieldValue(
                  "monthly_rent",
                  value === "" ? null : Number(value),
                );
              }}
              onBlur={formik.handleBlur}
              className={cn(
                "w-full rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                formik.touched.monthly_rent &&
                  formik.errors.monthly_rent &&
                  "border border-error",
              )}
            />
            {formik.touched.monthly_rent && formik.errors.monthly_rent && (
              <span className="text-xs font-medium text-error">
                {formik.errors.monthly_rent}
              </span>
            )}
          </div>
          {/* API ERROR */}
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

          {/* Actions */}
          <div className="flex flex-col items-center justify-end gap-3 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={handleClose}
              className="w-full bg-surface-container px-6 py-3.5 text-center font-headline-md text-[13px] uppercase tracking-wider text-on-surface transition-colors hover:bg-surface-container-high sm:w-auto"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!formik.isValid}
              className="w-full cursor-pointer rounded bg-copper px-6 py-3 text-on-primary hover:bg-jasper uppercase disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-copper md:w-auto"
            >
              GUARDAR
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
