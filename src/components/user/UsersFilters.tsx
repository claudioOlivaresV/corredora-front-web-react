import { Search } from "lucide-react";

interface UsersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const UsersFilters = ({ search, onSearchChange }: UsersFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 rounded bg-surface-container-lowest p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 items-center gap-3 rounded bg-surface-container-low px-4 py-3">
        <Search size={20} className="text-outline" />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar usuario"
          className="w-full bg-transparent font-body-md text-body-md text-obsidian outline-none placeholder:text-outline"
        />
      </div>
    </div>
  );
};
