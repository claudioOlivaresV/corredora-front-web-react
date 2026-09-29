import { getPropertyDetail } from "../../services/getPropertyDetail";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

export const ProperyDetail = () => {
  const { id } = useParams<{ id: string }>();

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
      <h1>{property.address}</h1>

      <p>{property.description}</p>

      <p>
        Arriendo:{" "}
        {property.monthly_rent.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}
      </p>

      <p>Estado: {property.status}</p>
    </div>
  );
};
