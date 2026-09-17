import { cn } from "cn";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";

import type { UserResponseTable } from "../../shared/types/types";

import { useUserDrawer } from "../../hooks/useUserDrawer";
import { SecurityInfo } from "../../components/shared/SecurityInfo";
import ErrorMessage from "../../components/shared/ErrorMessage";

interface UserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserResponseTable;
}

export const UserDrawer = ({ open, onOpenChange, user }: UserDrawerProps) => {
  const { formik, isEdit, errorMessage, isPending, handleClose } =
    useUserDrawer({
      user,
      onOpenChange,
    });

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
          return;
        }

        onOpenChange(true);
      }}
    >
      <SheetContent
        side="right"
        className="w-full border-l border-outline-variant/30 bg-surface-container-lowest p-0 md:w-1/2 md:min-w-1/2"
      >
        <div className="flex h-full flex-col">
          {/* HEADER */}
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

          {/* FORM */}
          <form
            className="flex flex-1 flex-col overflow-y-auto"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-1 flex-col gap-6 p-8">
              {/* NOMBRE */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold uppercase tracking-wider text-obsidian"
                >
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
                    {formik.errors.name}
                  </span>
                )}
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-obsidian"
                >
                  Correo Electrónico *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="usuario@corredora.cl"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={cn(
                    "rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none",
                    formik.touched.email &&
                      formik.errors.email &&
                      "border border-error",
                  )}
                />

                {formik.touched.email && formik.errors.email && (
                  <span className="text-xs font-medium text-error">
                    {formik.errors.email}
                  </span>
                )}
              </div>

              {/* PASSWORD */}
              {!isEdit && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-obsidian"
                  >
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
                      {formik.errors.password}
                    </span>
                  )}
                </div>
              )}

              {/* ROLE */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="role"
                  className="text-xs font-semibold uppercase tracking-wider text-obsidian"
                >
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
                    {formik.errors.role}
                  </span>
                )}
              </div>

              {/* SECURITY INFO */}
              <SecurityInfo />

              {/* API ERROR */}
              {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            </div>

            {/* FOOTER */}
            <div className="flex flex-col-reverse gap-3 border-t border-outline-variant/20 bg-surface-container-lowest p-6 md:flex-row md:justify-end md:p-8">
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded px-5 py-3 text-on-surface-variant hover:bg-surface-container md:w-auto"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isPending || !formik.isValid}
                className="w-full cursor-pointer rounded bg-copper px-6 py-3 text-on-primary hover:bg-jasper disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-copper md:w-auto"
              >
                {isPending
                  ? "Guardando..."
                  : isEdit
                    ? "Guardar Cambios"
                    : "Guardar Usuario"}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
