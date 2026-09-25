import { useEffect, useState } from "react";
import { healthCheck } from "../services/healthCheck.services";
import { Loading } from "./shared/Loading";

interface AppStartupProps {
  children: React.ReactNode;
}

export const AppStartup = ({ children }: AppStartupProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await healthCheck();
      } catch (error) {
        console.error("Backend no disponible:", error);
      } finally {
        setIsReady(true);
      }
    };

    wakeUpBackend();
  }, []);

  if (!isReady) {
    return (
      <>
        <p className="text-sm text-gray-500 text-center">
          Iniciado Api porfavor espere
        </p>
        <Loading />
      </>
    );
  }

  return children;
};
