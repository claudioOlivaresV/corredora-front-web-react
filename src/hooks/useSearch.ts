import { useState } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (value: string): void => {
    setSearch(value);
  };

  const clearSearch = (): void => {
    setSearch("");
  };

  return {
    search,
    setSearch: handleSearchChange,
    clearSearch,
  };
};
