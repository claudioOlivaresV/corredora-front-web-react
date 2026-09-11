import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded bg-surface-container-lowest shadow-sm">
      <LoaderCircle
        size={32}
        strokeWidth={2}
        className="animate-spin text-obsidian"
      />

      <span className="mt-4 text-sm text-on-surface-variant">
        Cargando datos...
      </span>
    </div>
  );
};
