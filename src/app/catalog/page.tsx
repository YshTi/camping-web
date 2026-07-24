"use client";

import { useState } from "react";

import CatalogFilter from "@/components/catalog-filter/catalog-filter";
import Container from "@/components/container/container";
import TruckCard from "@/components/truck-card/truck-card";

import type { TruckFilters } from "@/types/filters";
import type { Truck } from "@/types/truck";

import styles from "./page.module.css";

const initialFilters: TruckFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

const mockTruck: Truck = {
  id: "1",
  name: "Mavericks",
  price: 8000,
  rating: 4.4,
  location: "Kyiv, Ukraine",
  form: "alcove",
  length: "6.5 m",
  width: "2.3 m",
  height: "3.1 m",
  tank: "100 l",
  consumption: "12 l/100 km",
  transmission: "automatic",
  engine: "petrol",
  amenities: ["ac", "bathroom", "kitchen"],
  coverImage: "/images/hero.webp",
  totalReviews: 2,
};

export default function CatalogPage() {
  const [, setActiveFilters] =
    useState<TruckFilters>(initialFilters);

  return (
    <Container className={styles.content}>
      <CatalogFilter onSubmit={setActiveFilters} />

      <TruckCard truck={mockTruck} />
    </Container>
  );
}