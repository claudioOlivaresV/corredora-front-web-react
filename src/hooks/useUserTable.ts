import { useMemo, useState } from "react";
import { getUsuario } from "../services/getUsuario.services";
import { useQuery } from "@tanstack/react-query";
const PAGE_SIZE = 10;
export const useUsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsuario,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const users = query.data ?? [];

  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return users.slice(start, end);
  }, [users, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return {
    users: paginatedUsers,
    currentPage,
    totalPages,
    totalUsers: users.length,
    pageSize: PAGE_SIZE,
    goToPage,
    isLoading: query.isLoading,
    isError: query.isError,
    retry: query.refetch,
    isRetrying: query.isFetching,
    formatDate,
  };
};
