import { Bell, Menu, Search } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant/30 bg-surface/95 px-6 backdrop-blur lg:left-72 lg:w-[calc(100%-18rem)]">
      <div className="flex items-center gap-4">
        {/* Menú mobile */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface lg:hidden"
          aria-label="Abrir menú"
          title="Abrir menú"
        >
          <Menu size={24} />
        </button>

        {/* Buscador */}
        <div className="hidden items-center gap-2 md:flex">
          <Search size={18} className="text-on-surface-variant" />

          <input
            type="text"
            placeholder="Buscar..."
            className="w-64 bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <button
          type="button"
          className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
          aria-label="Notificaciones"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
        </button>

        <div className="hidden h-8 w-px bg-outline-variant/30 sm:block" />

        {/* Usuario */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
            AU
          </div>

          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium text-on-surface">
              Admin User
            </span>

            <span className="text-xs text-on-surface-variant">
              Director General
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
