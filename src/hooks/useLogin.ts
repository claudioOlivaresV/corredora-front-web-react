import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../services/LoginService";
import { login } from "../store/auth.slice";
import type { LoginResponse, RequestLogin } from "../shared/types/types";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values: RequestLogin) => loginRequest(values),

    onSuccess: (data: LoginResponse) => {
      dispatch(
        login({
          token: data.token,
          user: data.user,
        }),
      );

      navigate("/dashboard");
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
};
