import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUsuario } from "../services/getUsuario.services";
import type { UserResponseTable } from "../shared/types/types";
import { blockUser } from "../services/desactivarUsuario.service";
import { toast } from "sonner";
import { unblockUser } from "../services/unblockUser.service";

const PAGE_SIZE = 10;

export const useUsersTable = () => {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserResponseTable | null>(
    null,
  );

  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const [userToToggle, setUserToToggle] = useState<UserResponseTable | null>(
    null,
  );

  const query = useQuery<UserResponseTable[]>({
    queryKey: ["users"],
    queryFn: getUsuario,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const toggleMutation = useMutation({
    mutationFn: ({
      userId,
      user,
    }: {
      userId: number;
      user: UserResponseTable;
    }) => {
      if (user.active) {
        return blockUser(userId);
      } else {
        return unblockUser(userId);
      }
    },
    onSuccess: () => {
      setConfirmModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Estado del usuario cambiado correctamente");
      closeConfirmModal();
    },

    onError: (error) => {
      toast.error("Error al cambiar estado del usuario");
      setConfirmModalOpen(false);
      console.error("Error al cambiar estado del usuario:", error);
    },
  });

  const users = query.data ?? [];

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user: UserResponseTable) =>
      user.name.toLowerCase().includes(normalizedSearch),
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const goToPage = (page: number): void => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleEdit = (user: UserResponseTable): void => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleToggleUser = (user: UserResponseTable): void => {
    setUserToToggle(user);
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = (): void => {
    if (toggleMutation.isPending) {
      return;
    }

    setConfirmModalOpen(false);
    setUserToToggle(null);
  };

  const confirmToggleUser = (): void => {
    if (!userToToggle) {
      return;
    }

    toggleMutation.mutate({
      userId: userToToggle.id,
      user: userToToggle,
    });
  };

  return {
    users: paginatedUsers,

    currentPage,
    totalPages,
    goToPage,
    allUsers: query.data,

    isLoading: query.isLoading,
    isError: query.isError,
    retry: query.refetch,
    isRetrying: query.isFetching,

    search,
    setSearch: handleSearchChange,

    drawerOpen,
    selectedUser,
    handleEdit,
    setDrawerOpen,

    confirmModalOpen,
    userToToggle,
    handleToggleUser,
    confirmToggleUser,
    closeConfirmModal,

    isTogglingUser: toggleMutation.isPending,
  };
};
