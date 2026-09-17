import { ShieldCheck } from "lucide-react";

export const SecurityInfo = () => {
  return (
    <div className="flex gap-3 rounded bg-surface-container-low p-4">
      <ShieldCheck size={20} className="mt-0.5 text-copper" />

      <div className="flex flex-col gap-1">
        <span className="font-caption text-caption font-medium text-obsidian">
          Credenciales Seguras
        </span>

        <span className="font-caption text-caption text-on-surface-variant">
          Las credenciales se gestionarán de forma segura mediante la API.
        </span>
      </div>
    </div>
  );
};
