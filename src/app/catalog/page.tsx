"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import CatalogFilter from "@/components/catalog-filter/catalog-filter";
import Container from "@/components/container/container";
import Loader from "@/components/loader/loader";
import TrucksList from "@/components/trucks-list/trucks-list";

import { getTrucks } from "@/lib/api/catalog";
import type { TruckFilters } from "@/types/filters";

import styles from "./page.module.css";

const initialFilters: TruckFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function CatalogPage() {
  const [activeFilters, setActiveFilters] =
    useState<TruckFilters>(initialFilters);

  const {
    data,
    error,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["trucks", activeFilters],

    queryFn: ({ pageParam }) =>
      getTrucks({
        page: pageParam,
        filters: activeFilters,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,

    gcTime: 0,
  });

  const trucks = data?.pages.flatMap((page) => page.campers) ?? [];

  const handleFilterSubmit = (filters: TruckFilters) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters(initialFilters);
  };

  return (
    <Container className={styles.content}>
      <CatalogFilter
        key={JSON.stringify(activeFilters)}
        initialValue={activeFilters}
        onSubmit={handleFilterSubmit}
      />

      <div className={styles.results}>
        {isPending && <Loader />}

        {isError && (
          <div className={styles.errorContainer}>
            <h1>Unable to load trucks</h1>

            <p>
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."}
            </p>
          </div>
        )}

        {!isPending && !isError && (
          <TrucksList
            trucks={trucks}
            onLoadMore={() => {
              if (hasNextPage && !isFetchingNextPage) {
                void fetchNextPage();
              }
            }}
            onClearFilters={handleClearFilters}
            hasNextPage={Boolean(hasNextPage)}
            isLoadingMore={isFetchingNextPage}
          />
        )}
      </div>
    </Container>
  );
}
