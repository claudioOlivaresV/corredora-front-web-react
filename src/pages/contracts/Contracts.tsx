import { getContractDetail } from "../../services/getContractDetail";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const Contracts = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: ["contract", id],
    queryFn: () => getContractDetail(id!),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  console.log(data);
  return (
    <>
      {isPending && <div>Cargando...</div>}
      {isError && <div>Error al cargar el contrato.</div>}
      {data && (
        <div>
          <h2>Detalles del Contrato</h2>
          <p>ID: {data[0].id}</p>
        </div>
      )}
    </>
  );
};
