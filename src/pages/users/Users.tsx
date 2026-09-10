import { useState } from "react";
import { UsersHeader } from "../../components/user/UserHeader";
import type { User } from "../../shared/types/types";
import { UserDrawer } from "./UserDrawer";

export const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handleCreate = () => {
    setSelectedUser(null);
    setDrawerOpen(true);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto flex w-full max-w-max-width flex-col gap-stack-lg px-4 py-4">
        <UsersHeader onCreate={handleCreate} />
        {/* <UsersKpiCards />
    <UsersFilters />
    <UsersTable /> */}
      </div>
      <UserDrawer
        open={drawerOpen}

        onOpenChange={setDrawerOpen}
      />
      {/* <UserDrawer />
  <ApiStatusToast /> */}
    </div>
  );
};
