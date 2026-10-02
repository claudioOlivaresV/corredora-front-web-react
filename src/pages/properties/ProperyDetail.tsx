import { HeaderSection } from "../../components/shared/HeaderSection";
import { getPropertyDetail } from "../../services/getPropertyDetail";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import { ChevronDown } from "lucide-react";
export const ProperyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["property-detail", id],
    queryFn: () => getPropertyDetail(id!),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
  if (isLoading) {
    return <div>Cargando propiedad...</div>;
  }

  if (isError) {
    return <div>Error al cargar la propiedad: {error.message}</div>;
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
            onCreate={() => console.log("")}
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
              <div className="flex items-center gap-4 p-4 rounded bg-surface-container-low/70">
                <div className="w-11 h-11 rounded-full bg-obsidian text-on-primary flex items-center justify-center font-label-caps text-label-caps font-semibold">
                  ER
                </div>
                <div>
                  <span className="block font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                    Agente Inmobiliario Directo
                  </span>
                  <span className="block font-body-md text-body-md font-medium text-obsidian">
                    Elena Rostova
                  </span>
                  <span className="block font-caption text-caption text-secondary">
                    AESTHET Private Concierge
                  </span>
                </div>
                <a
                  className="ml-2 w-8 h-8 rounded bg-surface-container flex items-center justify-center text-obsidian hover:bg-sand/60 transition-colors"
                  href="mailto:concierge@aesthet.cl"
                  title="Contactar asesor"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    mail
                  </span>
                </a>
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
              <div className="space-y-1">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">
                  Vigencia Contractual
                </span>
                <span className="font-headline-md text-headline-md text-obsidian">
                  15 Feb 2024 — 14 Feb 2025
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">
                  Próximo Vencimiento
                </span>
                <span className="font-headline-md text-headline-md text-copper font-medium">
                  30 Nov 2024
                </span>
              </div>
            </div>
          </section>
   <Collapsible
  open={isOpen}
  onOpenChange={setIsOpen}
  className="w-full"
>
  <CollapsibleTrigger className="flex w-full items-center justify-between border-b border-outline-variant py-4">
    <span className="font-label-caps text-label-caps text-obsidian uppercase tracking-wider">
      Información adicional
    </span>

    <ChevronDown
      size={20}
      className={`transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
    />
  </CollapsibleTrigger>

  <CollapsibleContent>
    <div className="pt-4">
      <p className="font-body-md text-body-md text-on-surface-variant">
        Texto adicional de la propiedad...
      </p>
    </div>
  </CollapsibleContent>
</Collapsible>
        </div>
      </div>
    </div>
  );
};
