import { useState } from "react";
import { UsersHeader } from "../../components/user/UserHeader";
import { UserDrawer } from "./UserDrawer";
import { UsersTable } from "../../components/user/UsersTable";
import { ToastMessage } from "../../components/shared/ToastMessage";

export const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleCreate = () => {
    setDrawerOpen(true);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto flex w-full max-w-max-width flex-col gap-stack-lg px-4 py-4">
        <UsersHeader onCreate={handleCreate} />
        <UsersTable />
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
      <ToastMessage message={"hola"} />
    </div>
  );
};
