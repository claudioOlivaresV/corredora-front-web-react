import type { ErrorStateProps } from "../../shared/types/types";
import { AlertCircle, RefreshCw } from "lucide-react";

export const ErrorState = ({
  onRetry,
  isRetrying = false,
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded bg-surface-container-lowest px-6 text-center shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-container text-on-error-container">
        <AlertCircle size={24} />
      </div>

      <h2 className="mb-2 text-lg font-semibold text-obsidian">
        No pudimos cargar los datos
      </h2>

      <p className="mb-6 max-w-md text-sm text-on-surface-variant">
        Ocurrió un problema al obtener la información. Intenta nuevamente.
      </p>

      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="flex items-center gap-2 rounded bg-obsidian px-5 py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCw size={16} className={isRetrying ? "animate-spin" : ""} />

        {isRetrying ? "Reintentando..." : "Reintentar"}
      </button>
    </div>
  );
};
