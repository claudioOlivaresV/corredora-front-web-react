import { RefreshCw } from "lucide-react";

interface ApiStatusToastProps {
  message: string;
}

export const ToastMessage = ({ message }: ApiStatusToastProps) => {
  return (
    <div className="fixed bottom-6 right-8 z-40 flex items-center gap-3 rounded bg-obsidian px-4 py-3 text-on-primary shadow-xl">
      <span className="h-2 w-2 animate-pulse rounded-full bg-muted-forest" />

      <div className="flex flex-col">
        <span className="font-label-caps text-[11px] uppercase tracking-wider text-primary-fixed">
          Sincronizado vía API REST
        </span>

        <span className="font-caption text-caption text-on-primary-container">
          {message}
        </span>
      </div>

      <RefreshCw size={18} className="text-outline" />
    </div>
  );
};
