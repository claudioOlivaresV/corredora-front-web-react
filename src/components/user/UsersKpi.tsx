import { UsersIcon, UserCheckIcon, UserXIcon } from "lucide-react";
import { UserKpiCards } from "./UserKpiCard";
import type { UserResponseTable } from "../../shared/types/types";
interface UsersKpiCardsProps {
  users: UserResponseTable[];
}
export const UsersKpiCards = ({ users }: UsersKpiCardsProps) => {
  const total = users.length;
  const activos = users.filter((user) => user.active).length;
  const bloqueados = users.filter((user) => !user.active).length;

  return (
    <div className="hidden lg:grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
      <UserKpiCards label="Total Usuarios" value={total} icon={UsersIcon} />
      <UserKpiCards
        label="Usuarios Activos"
        value={activos}
        icon={UserCheckIcon}
      />
      <UserKpiCards
        label="Usuarios Bloqueados"
        value={bloqueados}
        icon={UserXIcon}
      />
    </div>
  );
};
