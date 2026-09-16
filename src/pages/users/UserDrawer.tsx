import { ShieldCheck } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cn } from "cn";
import {
  roleMap,
  type CreateEditUser,
  type UserResponseTable,
} from "../../shared/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../services/createUser.service";
import { toast, Toaster } from "sonner";
import { useState } from "react";

interface UserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserResponseTable;
}

export const UserDrawer = ({ open, onOpenChange, user }: UserDrawerProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();
  const isEdit = Boolean(user);
  console.log(isEdit, user);

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
  const initialValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    role: user?.role ?? "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values: any) => {
      const newUsuer: CreateEditUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        role_id: roleMap[values.role],
      };
      mutation.mutate(newUsuer);
    },
  });
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      formik.resetForm();
      setErrorMessage("");
    }

    if (isOpen && user) {
      formik.resetForm({
        values: {
          name: user.name,
          email: user.email,
          password: "",
          role: user.role,
        },
      });
    }

    onOpenChange(isOpen);
  };
  const mutation = useMutation({
    mutationFn: (values: CreateEditUser) => createUser(values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onOpenChange(false);

      toast.success("Usuario creado correctamente", {
        description: "El usuario fue registrado en el sistema.",
        duration: 3000,
      });
    },
    onError: () => {
      setErrorMessage("No se pudo crear el usuario. Intenta nuevamente.");
    },
  });
  return (
    <>
      <Toaster />
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="right"
          className="w-full md:w-1/2 md:min-w-1/2 border-l border-outline-variant/30 bg-surface-container-lowest p-0 md:w-1/2"
        >
          <div className="flex h-full flex-col">
            <SheetHeader className="border-b border-outline-variant/20 bg-surface-container-low/30 p-8">
              <SheetTitle className="mt-1 font-headline-md text-headline-md text-obsidian">
                {isEdit ? "Editar Usuario" : "Nuevo Usuario de Sistema"}
              </SheetTitle>

              <SheetDescription className="mt-2 text-on-surface-variant">
                {isEdit
                  ? "Modifica los datos y permisos del usuario."
                  : "Crea un nuevo usuario para el sistema."}
              </SheetDescription>
            </SheetHeader>

            <form
              className="flex flex-1 flex-col overflow-y-auto"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-1 flex-col gap-6 p-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-obsidian">
                    Nombre
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nicole"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                      formik.touched.name &&
                        formik.errors.name &&
                        "border border-error",
                    )}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <span className="text-xs font-medium text-error">
                      {" "}
                      {!formik.errors.name}{" "}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-obsidian">
                    Correo Electrónico *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                      formik.touched.email &&
                        formik.errors.email &&
                        "border border-error",
                    )}
                    placeholder="usuario@corredora.cl"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-xs font-medium text-error">
                      {" "}
                      {!formik.errors.email}{" "}
                    </span>
                  )}
                </div>
                {!isEdit && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-obsidian">
                      Password
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn(
                        "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                        formik.touched.password &&
                          formik.errors.password &&
                          "border border-error",
                      )}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <span className="text-xs font-medium text-error">
                        {" "}
                        {!formik.errors.password}{" "}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-obsidian">
                    Rol de Sistema
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                      formik.touched.role &&
                        formik.errors.role &&
                        "border border-error",
                    )}
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="CORREDOR">CORREDOR</option>
                    <option value="ARRENDADOR">ARRENDADOR</option>
                    <option value="ARRENDATARIO">ARRENDATARIO</option>
                  </select>
                  {formik.touched.role && formik.errors.role && (
                    <span className="text-xs font-medium text-error">
                      {" "}
                      {!formik.errors.role}{" "}
                    </span>
                  )}
                </div>

                <div className="flex gap-3 rounded bg-surface-container-low p-4">
                  <ShieldCheck size={20} className="mt-0.5 text-copper" />

                  <div className="flex flex-col gap-1">
                    <span className="font-caption text-caption font-medium text-obsidian">
                      Credenciales Seguras
                    </span>

                    <span className="font-caption text-caption text-on-surface-variant">
                      Las credenciales se gestionarán de forma segura mediante
                      la API.
                    </span>
                  </div>
                </div>
                {errorMessage && (
                  <div className="px-5 rounded bg-error/10 px-4 py-3 text-sm font-medium text-error">
                    {errorMessage}
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-outline-variant/20 bg-surface-container-lowest p-6 md:flex-row md:justify-end md:p-8">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="w-full rounded px-5 py-3 text-on-surface-variant hover:bg-surface-container md:w-auto"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.isValid}
                  className="w-full rounded bg-copper px-6 py-3 text-on-primary hover:bg-jasper"
                >
                  {isEdit ? "Guardar Cambios" : "Guardar Usuario"}
                </button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
