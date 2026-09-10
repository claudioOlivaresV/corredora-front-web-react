import {
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  UserRoundCog,
  Users,
  WalletCards,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Propiedades",
    path: "/properties",
    icon: Building2,
  },
  {
    label: "Contratos",
    path: "/contracts",
    icon: FileText,
  },
  {
    label: "Pagos",
    path: "/payments",
    icon: WalletCards,
  },
  {
    label: "Clientes",
    path: "/clients",
    icon: Users,
  },
  {
    label: "Corredores",
    path: "/brokers",
    icon: BriefcaseBusiness,
  },
  {
    label: "Usuarios",
    path: "/users",
    icon: UserRoundCog,
  },
];

interface MenuProps {
  onNavigate?: () => void;
}

export const Aside = ({ onNavigate }: MenuProps) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col">
        <div className="px-8 pb-6 pt-8">
          <span className="block font-headline-md text-headline-md font-medium tracking-wider text-obsidian">
            AESTHET
          </span>

          <span className="mt-1 block font-label-caps text-label-caps uppercase tracking-widest text-copper">
            Executive Portal
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-body-md text-body-md">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4 border-t border-outline-variant/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-body-md text-body-md font-medium text-obsidian">
              Admin User
            </span>

            <span className="font-caption text-caption text-on-surface-variant">
              Director General
            </span>
          </div>

          <span className="rounded bg-sand/60 px-2 py-0.5 font-label-caps text-label-caps uppercase text-secondary">
            PRO
          </span>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 pt-2 text-left font-caption text-caption text-on-surface-variant transition-colors hover:text-error"
        >
          <LogOut size={18} />

          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};
