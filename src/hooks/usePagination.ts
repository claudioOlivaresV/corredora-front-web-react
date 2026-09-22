import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  items: T[];
  pageSize?: number;
}

export const usePagination = <T>({
  items,
  pageSize = 10,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return items.slice(startIndex, startIndex + pageSize);
  }, [items, currentPage, pageSize]);

  const goToPage = (page: number): void => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const resetPage = (): void => {
    setCurrentPage(1);
  };

  return {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    resetPage,
  };
};
