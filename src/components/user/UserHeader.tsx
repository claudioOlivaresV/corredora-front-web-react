import { UserPlus } from "lucide-react";

interface UsersHeaderProps {
  onCreate: () => void;
}

export const UsersHeader = ({ onCreate }: UsersHeaderProps) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-copper">
          Seguridad & Privilegios RBAC
        </span>

        <h1 className="font-headline-md text-headline-md text-obsidian">
          Gestión de Usuarios y Accesos
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant">
          Administra identidades, roles y permisos de acceso al sistema.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-2 rounded bg-copper px-5 py-3 font-label-caps text-label-caps uppercase tracking-wider text-on-primary transition-colors hover:bg-jasper"
        >
          <UserPlus size={17} />
          Nuevo Usuario
        </button>
      </div>
    </div>
  );
};
