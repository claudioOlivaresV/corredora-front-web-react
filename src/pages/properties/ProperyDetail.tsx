import { HeaderSection } from "../../components/shared/HeaderSection";
import { getPropertyDetail } from "../../services/getPropertyDetail";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@base-ui/react";
import { formatDate } from "../../hooks/useFormatDate";
import type { Contract } from "../../shared/types/types";
import { ErrorState } from "../../components/shared/ErrorState";
import { Loading } from "../../components/shared/Loading";
export const ProperyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: property,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["property-detail", id],
    queryFn: () => getPropertyDetail(id!),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const goToDetailContract = (contract: Contract) => {
    console.log(contract, "contratooo");

    navigate(`/contract/${contract.id}`);
  };
  const handleBack = () => {
    navigate(-1);
  };
  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} isRetrying={isFetching} />;
  }

  if (!property) {
    return <div>Propiedad no encontrada.</div>;
  }

  return (
    <div>
      <div className="flex flex-col w-full">
        <div className="mx-auto flex w-full max-w-max-width flex-col gap-stack-lg px-4 py-4">
          <HeaderSection
            label="Gestión Patrimonial"
            title="Detalle Propiedades"
            subtitle="Gestion de nuestras propiedades"
            textButton="Volver"
            iconButton={ArrowLeft}
            onCreate={() => handleBack()}
          />
          <section className="bg-surface-container-lowest rounded p-8 md:p-10 shadow-sm space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 bg-gradient-to-b from-transparent to-surface/20">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-headline-lg text-headline-lg text-obsidian tracking-tight">
                    {property.address}
                  </span>
                  <span className="px-3 py-1 rounded bg-copper/10 text-copper font-label-caps text-label-caps uppercase tracking-widest font-medium">
                    {property.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
                  <span>{property.description}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
              <div className="space-y-1">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">
                  Canon Mensual Acordado
                </span>
                <span className="font-headline-md text-headline-md text-obsidian font-semibold">
                  {property.monthly_rent.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </span>
              </div>
            </div>
          </section>
          <section>
            <h3 className="font-headline-md text-headline-md text-obsidian">
              Contratos
            </h3>
            {property.contracts.length > 0 && (
              <div className="overflow-hidden rounded bg-surface-container-lowest shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-surface-container-low/70">
                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                          ID
                        </th>

                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                          Fecha Inicio
                        </th>

                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-on-surface-variant">
                          Fecha de Termino
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
                      {property.contracts.map((contract: Contract) => {
                        return (
                          <tr
                            key={contract.id}
                            className="transition-colors hover:bg-sand/10"
                          >
                            <td className="px-6 py-5 font-caption text-caption text-outline">
                              {contract.id}
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="text-obsidian">
                                  {formatDate(contract.start_date)}
                                </span>
                              </div>
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="text-obsidian">
                                  {formatDate(contract.end_date)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span
                                className={
                                  contract.status === "ACTIVE"
                                    ? "rounded-full bg-muted-forest/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-forest"
                                    : contract.status === "CANCELLED"
                                      ? "rounded-full bg-sand/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-obsidian"
                                      : "rounded-full bg-slate-200/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-700"
                                }
                              >
                                {contract.status}
                              </span>
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  onClick={() => goToDetailContract(contract)}
                                  className="cursor-pointer inline-flex items-center gap-1.5 font-headline-md text-[13px] text-copper hover:text-jasper transition-colors uppercase tracking-wider font-medium group-hover:translate-x-0.5 transition-transform"
                                >
                                  <span>Ver Contrato</span>
                                  <ArrowRight />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {property.contracts.length === 0 && (
              <div className="py-4">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  No hay contratos asociados a esta propiedad.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
