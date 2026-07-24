"use client";

import { useEffect, useRef } from "react";

import NotFound from "@/components/not-found/not-found";
import Pagination from "@/components/pagination/pagination";
import TruckCard from "@/components/truck-card/truck-card";
import type { Truck } from "@/types/truck";

import styles from "./trucks-list.module.css";

interface TrucksListProps {
  trucks: Truck[];
  onLoadMore: () => void;
  onClearFilters: () => void;
  hasNextPage: boolean;
  isLoadingMore?: boolean;
}

export default function TrucksList({
  trucks,
  onLoadMore,
  onClearFilters,
  hasNextPage,
  isLoadingMore = false,
}: TrucksListProps) {
  const previousCountRef = useRef(trucks.length);
  const shouldScrollRef = useRef(false);

  const handleLoadMore = () => {
    previousCountRef.current = trucks.length;
    shouldScrollRef.current = true;
    onLoadMore();
  };

  useEffect(() => {
    if (
      !shouldScrollRef.current ||
      isLoadingMore ||
      trucks.length <= previousCountRef.current
    ) {
      return;
    }

    const firstNewCard = document.querySelector<HTMLElement>(
      `[data-truck-index="${previousCountRef.current}"]`,
    );

    firstNewCard?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    shouldScrollRef.current = false;
  }, [trucks.length, isLoadingMore]);

  if (trucks.length === 0) {
    return <NotFound onClearFilters={onClearFilters} />;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {trucks.map((truck, index) => (
          <li
            key={truck.id}
            data-truck-index={index}
            className={styles.item}
          >
            <TruckCard truck={truck} />
          </li>
        ))}
      </ul>

      <Pagination
        onLoadMore={handleLoadMore}
        hasNextPage={hasNextPage}
        isLoading={isLoadingMore}
      />
    </div>
  );
}