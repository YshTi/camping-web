import axios from "axios";

import type { TruckFilters } from "@/types/filters";
import type { TrucksResponse } from "@/types/truck";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const api = axios.create({
  baseURL: apiUrl,
});

interface GetTrucksParams {
  page: number;
  filters: TruckFilters;
}


export async function getTrucks({
  page,
  filters,
}: GetTrucksParams): Promise<TrucksResponse> {
  const response = await api.get<TrucksResponse>("/campers", {
    params: {
      page,
      perPage: 4,
      location: filters.location.trim() || undefined,
      form: filters.form || undefined,
      engine: filters.engine || undefined,
      transmission: filters.transmission || undefined,
    },
  });

  return response.data;
}