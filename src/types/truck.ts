export type TruckForm =
  | "alcove"
  | "panel_van"
  | "integrated"
  | "semi_integrated";

export type TruckTransmission =
  | "automatic"
  | "manual";

export type TruckEngine =
  | "diesel"
  | "petrol"
  | "hybrid"
  | "electric";

export type TruckAmenity =
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

export interface Truck {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: TruckForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: TruckTransmission;
  engine: TruckEngine;
  amenities: TruckAmenity[];
  coverImage: string;
  totalReviews: number;
}

export interface TrucksResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Truck[];
}