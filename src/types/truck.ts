export type TruckForm =
  "alcove" | "panel_van" | "integrated" | "semi_integrated";

export type TruckTransmission = "automatic" | "manual";

export type TruckEngine = "diesel" | "petrol" | "hybrid" | "electric";

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
  totalReviews: number;
  location: string;
  description: string;
  form: TruckForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: TruckTransmission;
  engine: TruckEngine;
  amenities: TruckAmenity[] | TruckAmenity;
  coverImage: string;
  gallery: TruckGalleryImage[];
  createdAt: string;
  updatedAt: string;
}

export interface TrucksResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Truck[];
}

export interface TruckGalleryImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface TruckReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}
