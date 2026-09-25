import { Navigate, Route, Routes } from "react-router-dom";

import { PrivateLayout } from "../layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Login } from "../pages/auth/Login";
import { Users } from "../pages/users/Users";
import RoleRoute from "./RoleRoute";
import { Contracts } from "../pages/contracts/Contracts";
import { Properties } from "../pages/properties/Properties";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />

      {/* Privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route element={<RoleRoute allowedRoles={["ADMIN", "CORREDOR"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={["ADMIN", "CORREDOR"]} />}>
            <Route path="/users" element={<Users />} />
          </Route>
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                  "CORREDOR",
                  "ARRENDADOR",
                  "ARRENDATARIO",
                ]}
              />
            }
          >
            <Route path="/contracts" element={<Contracts />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={["ADMIN", "CORREDOR"]} />}>
            <Route path="/properties" element={<Properties />} />
          </Route>
          {/* <Route path="/properties" element={<div>Properties</div>} /> */}

          {/* 
          <Route path="/properties" element={<div>Properties</div>} />


          <Route path="/payments" element={<div>Payments</div>} />

          <Route path="/users" element={<div>Users</div>} /> */}
        </Route>
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/contracts" replace />} />
    </Routes>
  );
};

export default AppRoutes;
