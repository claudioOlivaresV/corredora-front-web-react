import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../store/store";

type UserRole = "ADMIN" | "CORREDOR" | "ARRENDADOR" | "ARRENDATARIO";

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const hasPermission =
    user?.role && allowedRoles.includes(user.role as UserRole);

  if (!hasPermission) {
    return <Navigate to="/contracts" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
