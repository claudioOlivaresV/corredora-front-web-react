import { useUsersTable } from "../../hooks/useUserTable";
import { Edit } from "lucide-react";
import { ErrorState } from "../shared/ErrorState";
import { Loading } from "../shared/Loading";
import type { UserResponseTable } from "../../shared/types/types";
import { UsersKpiCards } from "./UsersKpi";

export const UsersTable = () => {
  const {
    users,
    currentPage,
    totalPages,
    goToPage,
    isLoading,
    isError,
    retry,
    isRetrying,
    formatDate,
  } = useUsersTable();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorState onRetry={retry} isRetrying={isRetrying} />;
  }
  return (
    <>
      <UsersKpiCards users={users} />
      <div className="overflow-hidden rounded bg-surface-container-lowest shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low/70">
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                  ID Usuario
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                  Usuario
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                  Rol
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                  Fecha de Creación
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                  Estado
                </th>

                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-on-surface-variant">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-container">
              {users.map((user: UserResponseTable) => {
                return (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-sand/10"
                  >
                    <td className="px-6 py-5 font-caption text-caption text-outline">
                      {user.id}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-obsidian">
                            {user.name}
                          </span>

                          <span className="font-caption text-caption text-on-surface-variant">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          user.role === "CORREDOR"
                            ? "rounded-full bg-muted-forest/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-forest"
                            : user.role === "ARRENDADOR"
                              ? "rounded-full bg-sand/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-obsidian"
                              : "rounded-full bg-slate-200/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-700"
                        }
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-obsidian">
                          {formatDate(user.created_at)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          user.active
                            ? "inline-flex items-center gap-1.5 rounded-full bg-muted-forest/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-forest"
                            : "inline-flex items-center gap-1.5 rounded-full bg-surface-container-highest px-3 py-1 text-xs font-medium uppercase tracking-wider text-outline"
                        }
                      >
                        <span
                          className={
                            user.active
                              ? "h-1.5 w-1.5 rounded-full bg-muted-forest"
                              : "h-1.5 w-1.5 rounded-full bg-outline"
                          }
                        />
                        {user.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          title="Editar usuario"
                          className="rounded p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-obsidian"
                        >
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-surface-container px-6 py-4">
            <span className="text-sm text-on-surface-variant">
              Página {currentPage} de {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="rounded px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="rounded px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
