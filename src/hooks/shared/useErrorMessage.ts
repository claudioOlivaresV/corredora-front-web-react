import { useState } from "react";

export const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const clearError = () => {
    setErrorMessage("");
  };

  const setError = (message: string) => {
    setErrorMessage(message);
  };

  return {
    errorMessage,
    setError,
    clearError,
  };
};
