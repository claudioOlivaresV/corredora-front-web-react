import { useMemo } from "react";
import { useUsersTable } from "../useUserTable";

export const usePropertyUsers = () => {
  const { allUsers } = useUsersTable();

  const owners = useMemo(
    () => allUsers?.filter((user) => user.role === "ARRENDADOR") ?? [],
    [allUsers],
  );

  const agents = useMemo(
    () => allUsers?.filter((user) => user.role === "CORREDOR") ?? [],
    [allUsers],
  );

  return {
    owners,
    agents,
  };
};
