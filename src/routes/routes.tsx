import { Navigate, Route, Routes } from "react-router-dom";

import { PrivateLayout } from "../layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Login } from "../pages/auth/Login";
import { Users } from "../pages/users/Users";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />

      {/* Privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* 
          <Route path="/properties" element={<div>Properties</div>} />

          <Route path="/contracts" element={<div>Contracts</div>} />

          <Route path="/payments" element={<div>Payments</div>} />

          <Route path="/users" element={<div>Users</div>} /> */}
        </Route>
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
