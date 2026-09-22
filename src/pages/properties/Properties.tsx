import { useProperties } from "../../hooks/useProperties";
import { formatDate } from "../../hooks/useFormatDate";
import { Button } from "@base-ui/react";
import {
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRight,
  ArrowRightIcon,
  Edit,
  HousePlus,
} from "lucide-react";
import { FilterTable } from "../../components/shared/FilterTable";
import type { PropertyResponse } from "../../shared/types/types";
import { HeaderSection } from "../../components/shared/HeaderSection";
import { useState } from "react";
import { ModalProperties } from "../../components/properties/ModalProperties";

export const Properties = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCreate = () => {
    setModalOpen(true);
  };
  const { properties, search, setSearch, currentPage, goToPage, totalPages } =
    useProperties();
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="mx-auto flex w-full max-w-max-width flex-col gap-stack-lg px-4 py-4">
          <HeaderSection
            label="Gestión Patrimonial"
            title="Propiedades"
            subtitle="Gestion de nuestras propiedades"
            textButton="Nueva Propiedad"
            iconButton={HousePlus}
            onCreate={handleCreate}
          />
          <FilterTable
            search={search}
            onSearchChange={setSearch}
            textSearch="Propiedades"
          />
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
                  {properties.map((property: PropertyResponse) => {
                    return (
                      <tr
                        key={property.id}
                        className="transition-colors hover:bg-sand/10"
                      >
                        <td className="px-6 py-5 font-caption text-caption text-outline">
                          {property.id}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <span className="font-medium text-obsidian">
                                {property.address}
                              </span>

                              <span className="font-caption text-caption text-on-surface-variant">
                                {property.description}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-obsidian">
                              {formatDate(property.created_at)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={
                              property.status === "AVAILABLE"
                                ? "rounded-full bg-muted-forest/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-forest"
                                : property.status === "RENTED"
                                  ? "rounded-full bg-sand/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-obsidian"
                                  : "rounded-full bg-slate-200/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-700"
                            }
                          >
                            {property.status}
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
        </div>
      </div>
      <ModalProperties open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};
