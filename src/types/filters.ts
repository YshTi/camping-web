export type TruckForm =
  | ""
  | "alcove"
  | "panel_van"
  | "integrated"
  | "semi_integrated";

export type TruckTransmission =
  | ""
  | "automatic"
  | "manual";

export type TruckEngine =
  | ""
  | "diesel"
  | "petrol"
  | "hybrid"
  | "electric";

export interface TruckFilters {
  location: string;
  form: TruckForm;
  transmission: TruckTransmission;
  engine: TruckEngine;
}