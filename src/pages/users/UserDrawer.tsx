import { ShieldCheck } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";

interface UserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserDrawer = ({ open, onOpenChange }: UserDrawerProps) => {
  const isEdit = Boolean(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-lg border-l border-outline-variant/30 bg-surface-container-lowest p-0"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-outline-variant/20 bg-surface-container-low/30 p-8">
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="mt-1 font-headline-md text-headline-md text-obsidian">
                  {isEdit ? `Editar ${"Usuario"}` : "Nuevo Usuario de Sistema"}
                </SheetTitle>

                <SheetDescription className="mt-2 text-on-surface-variant">
                  {isEdit
                    ? "Modifica los datos y permisos del usuario."
                    : "Crea un nuevo usuario para el sistema."}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <form className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex flex-1 flex-col gap-6 p-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-obsidian">
                  Nombre Completo *
                </label>

                <input
                  required

                  placeholder="ej. Marcus Thorne"
                  className="rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-obsidian">
                  Correo Electrónico *
                </label>

                <input
                  required
                  type="email"

                  placeholder="usuario@aesthet.com"
                  className="rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-obsidian">
                  Rol de Sistema *
                </label>
                <select
                  required
                  className="w-full rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="CORREDOR">CORREDOR</option>
                  <option value="ARRENDADOR">ARRENDADOR</option>
                  <option value="ARRENDATARIO">ARRENDATARIO</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-obsidian">
                  Estado
                </label>

                <select className="rounded bg-surface-container-low px-4 py-3 text-obsidian outline-none">
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                  <option value="PENDIENTE">PENDIENTE</option>
                </select>
              </div>

              <div className="flex gap-3 rounded bg-surface-container-low p-4">
                <ShieldCheck size={20} className="mt-0.5 text-copper" />

                <div className="flex flex-col gap-1">
                  <span className="font-caption text-caption font-medium text-obsidian">
                    Credenciales Seguras
                  </span>

                  <span className="font-caption text-caption text-on-surface-variant">
                    Las credenciales se gestionarán de forma segura mediante la
                    API.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-outline-variant/20 bg-surface-container-lowest p-8">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded px-5 py-3 text-on-surface-variant hover:bg-surface-container"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded bg-copper px-6 py-3 text-on-primary hover:bg-jasper"
              >
                {isEdit ? "Guardar Cambios" : "Guardar Usuario"}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
