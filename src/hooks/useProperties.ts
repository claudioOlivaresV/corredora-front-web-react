import type { PropertyResponse } from "../shared/types/types";
import { getProperties } from "../services/getProperties.service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { usePagination } from "./usePagination";
import { useSearch } from "./useSearch";

export const useProperties = () => {
  const { search, setSearch } = useSearch();

  const query = useQuery<PropertyResponse[]>({
    queryKey: ["properties"],
    queryFn: getProperties,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const properties = query.data ?? [];

  const filteredProperties = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) {
      return properties;
    }

    return properties.filter((property: PropertyResponse) =>
      property.address.toLowerCase().includes(normalizedSearch),
    );
  }, [properties, search]);

  const { paginatedItems, currentPage, totalPages, goToPage, resetPage } =
    usePagination({
      items: filteredProperties,
      pageSize: 10,
    });

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    resetPage();
  };

  return {
    properties: paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    search,
    setSearch: handleSearchChange,
  };
};
