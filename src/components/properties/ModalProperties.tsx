import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";

interface ModalPropertiesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ModalProperties = ({
  open,
  onOpenChange,
}: ModalPropertiesProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-surface-container-lowest p-8 shadow-2xl md:p-10">
        <DialogHeader className="mb-8 flex flex-col text-left">
          <DialogTitle className="font-display text-[28px] tracking-tight text-obsidian">
            Crear Nuevo Propiedad
          </DialogTitle>

          <DialogDescription className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Complete los campos necesarios para crear una propiedad.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
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
              placeholder="Providencia 1267"
            />
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="role"
              className="text-xs font-semibold uppercase tracking-wider text-obsidian"
            >
              Dueño Propiedad
            </label>

            <select id="role" name="role" value="">
              <option value="">Selecciona un rol</option>
              <option value="CORREDOR">CORREDOR</option>
              <option value="ARRENDADOR">ARRENDADOR</option>
              <option value="ARRENDATARIO">ARRENDATARIO</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="role"
              className="text-xs font-semibold uppercase tracking-wider text-obsidian"
            >
              Corredor Asignado
            </label>

            <select id="role" name="role" value="">
              <option value="">Selecciona un rol</option>
              <option value="CORREDOR">CORREDOR</option>
              <option value="ARRENDADOR">ARRENDADOR</option>
              <option value="ARRENDATARIO">ARRENDATARIO</option>
            </select>
          </div>

          {/* Monthly rent */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="monthly_rent"
                className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
              >
                Canon Mensual <span className="text-copper">*</span>
              </label>

              <span className="font-caption text-[11px] uppercase text-copper">
                Valor sugerido: --
              </span>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-4 font-headline-md text-body-md text-outline">
                $
              </span>

              <input
                id="monthly_rent"
                name="monthly_rent"
                type="number"
                min="1"
                step="50"
                required
                placeholder="Ej: 6400"
                className="w-full bg-surface-container-low py-3 pl-8 pr-16 font-headline-md text-[16px] text-obsidian outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center justify-end gap-3 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full bg-surface-container px-6 py-3.5 text-center font-headline-md text-[13px] uppercase tracking-wider text-on-surface transition-colors hover:bg-surface-container-high sm:w-auto"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-copper px-8 py-3.5 font-headline-md text-[13px] uppercase tracking-wider text-surface-container-lowest shadow-sm transition-colors hover:bg-jasper sm:w-auto"
            >
              <span className="text-[18px]">↻</span>
              <span>Agregar Propiedad</span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
