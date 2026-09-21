import { Button } from "@base-ui/react";
import {
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRight,
  ArrowRightIcon,
  Edit,
} from "lucide-react";

const formatDate = (date: string): string => {
  return new Date(date).toLocaleString("es-CL");
};

export const Properties = () => {
  const properties = [
    {
      id: 4,
      address: "2",
      description: "primera cas",
      monthly_rent: 10004,
      status: "AVAILABLE",
      owner_id: 3,
      agent_id: 2,
      created_at: "2026-09-03T19:10:30.639Z",
    },
    {
      id: 3,
      address: "calle 3",
      description: "primera casa",
      monthly_rent: 1000.4,
      status: "AVAILABLE",
      owner_id: 3,
      agent_id: 2,
      created_at: "2026-09-02T20:45:03.863Z",
    },
    {
      id: 2,
      address: "calle 2",
      description: "primera casa",
      monthly_rent: 1,
      status: "AVAILABLE",
      owner_id: 3,
      agent_id: 2,
      created_at: "2026-09-02T20:40:10.614Z",
    },
    {
      id: 1,
      address: "Av. Apoquindo 456",
      description: "Departamento remodelado",
      monthly_rent: 700000,
      status: "AVAILABLE",
      owner_id: 3,
      agent_id: 2,
      created_at: "2026-09-02T01:20:31.299Z",
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto flex w-full max-w-max-width flex-col gap-stack-lg px-4 py-4">
        <div className="overflow-hidden rounded bg-surface-container-lowest shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-surface-container-low/70">
                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                    ID
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                    Propiedad
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
                {properties.map((user: any) => {
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
                              {user.address}
                            </span>

                            <span className="font-caption text-caption text-on-surface-variant">
                              {user.description}
                            </span>
                          </div>
                        </div>
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
                            user.status === "AVAILABLE"
                              ? "rounded-full bg-muted-forest/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-forest"
                              : user.status === "RENTED"
                                ? "rounded-full bg-sand/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-obsidian"
                                : "rounded-full bg-slate-200/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-700"
                          }
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            title="Editar usuario"
                            // onClick={() => handleEdit(user)}
                            className="cursor-pointer rounded p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-obsidian"
                          >
                            <Edit size={18} />
                          </Button>
                          <Button
                            type="button"

                            // onClick={() => handleToggleUser(user)}
                            className="cursor-pointer inline-flex items-center gap-1.5 font-headline-md text-[13px] text-copper hover:text-jasper transition-colors uppercase tracking-wider font-medium group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>Ver Detalle</span>
                            <ArrowRight />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-surface-container px-6 py-4">
              <span className="text-sm text-on-surface-variant">Página</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  //   disabled={currentPage === 1}
                  //   onClick={() => goToPage(currentPage - 1)}
                  className="rounded px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Anterior
                </button>

                <button
                  type="button"
                  //   disabled={currentPage === totalPages}
                  //   onClick={() => goToPage(currentPage + 1)}
                  className="rounded px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
