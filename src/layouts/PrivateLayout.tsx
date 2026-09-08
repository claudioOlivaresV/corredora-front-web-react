import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  return (
    <div>
      <header>Header</header>

      <aside>Sidebar</aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
