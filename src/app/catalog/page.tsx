"use client";

import { useState } from "react";

import CatalogFilter from "@/components/catalog-filter/catalog-filter";
import type { TruckFilters } from "@/types/filters";

const initialFilters: TruckFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function CatalogPage() {
  const [activeFilters, setActiveFilters] =
    useState<TruckFilters>(initialFilters);

  return (
    <>
      <CatalogFilter onSubmit={setActiveFilters} />
    </>
  );
}