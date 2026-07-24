export type TruckFilterForm =
  | ""
  | "alcove"
  | "panel_van"
  | "integrated"
  | "semi_integrated";

export type TruckFilterTransmission =
  | ""
  | "automatic"
  | "manual";

export type TruckFilterEngine =
  | ""
  | "diesel"
  | "petrol"
  | "hybrid"
  | "electric";

export interface TruckFilters {
  location: string;
  form: TruckFilterForm;
  transmission: TruckFilterTransmission;
  engine: TruckFilterEngine;
}