import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsuario } from "../services/getUsuario.services";

const PAGE_SIZE = 10;

export const useUsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsuario,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const filteredUsers = useMemo(() => {
    const users = query.data ?? [];
    const querySearch = search.trim().toLowerCase();

    if (!querySearch) {
      return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(querySearch),
    );
  }, [query.data, search]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return filteredUsers.slice(start, end);
  }, [filteredUsers, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), Math.max(totalPages, 1)));
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
    search,
    setSearch,
    currentPage,
    totalPages,
    totalUsers: filteredUsers.length,
    pageSize: PAGE_SIZE,
    goToPage,
    isLoading: query.isLoading,
    isError: query.isError,
    retry: query.refetch,
    isRetrying: query.isFetching,
    formatDate,
  };
};
