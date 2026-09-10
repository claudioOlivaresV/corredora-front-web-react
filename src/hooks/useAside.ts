import type { RootState } from "@/store/store";
import { logout } from "../store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNavigate = () => {
    // Aquí puedes agregar lógica común de navegación
  };

  return {
    user,
    handleLogout,
    handleNavigate,
  };
};
