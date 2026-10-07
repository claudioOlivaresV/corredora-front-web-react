import { Navigate, Route, Routes } from "react-router-dom";

import { PrivateLayout } from "../layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Login } from "../pages/auth/Login";
import { Users } from "../pages/users/Users";
import RoleRoute from "./RoleRoute";
import { Contracts } from "../pages/contracts/Contracts";
import { Properties } from "../pages/properties/Properties";
import { ProperyDetail } from "../pages/properties/ProperyDetail";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />

      {/* Privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
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
          ></Route>
          <Route element={<RoleRoute allowedRoles={["ADMIN", "CORREDOR"]} />}>
            <Route path="/properties" element={<Properties />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={["ADMIN", "CORREDOR"]} />}>
            <Route path="/properties/:id" element={<ProperyDetail />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={["ADMIN", "CORREDOR"]} />}>
            <Route path="/contracts/:id" element={<Contracts />} />
          </Route>
          {/* <Route path="/properties" element={<div>Properties</div>} /> */}

          {/* 
          <Route path="/properties" element={<div>Properties</div>} />


          <Route path="/payments" element={<div>Payments</div>} />

          <Route path="/users" element={<div>Users</div>} /> */}
        </Route>
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/properties" replace />} />
    </Routes>
  );
};

export default AppRoutes;
