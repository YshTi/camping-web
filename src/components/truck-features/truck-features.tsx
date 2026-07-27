import { FaStar } from "react-icons/fa";
import { IoMapOutline } from "react-icons/io5";
import FeatureBadges from "@/components/truck-features/feature-badges/feature-badges";

import type { Truck } from "@/types/truck";
import {
  engineOptions,
  transmissionOptions,
  truckFormOptions,
} from "@/types/trucks";

import styles from "./truck-features.module.css";

interface TruckFeaturesProps {
  truck: Truck;
}

const amenityLabels: Record<string, string> = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

function getLabel(
  options: readonly { label: string; value: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function formatMeasurement(value: string) {
  return value.replace(/(\d)([a-zA-Z])/g, "$1 $2");
}

function formatConsumption(value: string) {
  return value
    .trim()
    .replace(/\s+/g, "")
    .replace(/^([\d.,]+)l\/100km$/i, "$1 l / 100 km");
}

export default function TruckFeatures({ truck }: TruckFeaturesProps) {
  const amenities = Array.isArray(truck.amenities)
    ? truck.amenities
    : truck.amenities
      ? [truck.amenities]
      : [];

  const featureLabels = [
    getLabel(transmissionOptions, truck.transmission),
    ...amenities.map((amenity) => amenityLabels[amenity] ?? amenity),
    getLabel(engineOptions, truck.engine),
    getLabel(truckFormOptions, truck.form),
  ];

  return (
    <section className={styles.features}>
      <div className={styles.summary}>
        <h2 className={styles.title}>{truck.name}</h2>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <FaStar className={styles.star} aria-hidden="true" />
            {truck.rating}({truck.totalReviews} Reviews)
          </span>

          <span className={styles.location}>
            <IoMapOutline aria-hidden="true" />
            {truck.location}
          </span>
        </div>

        <p className={styles.price}>€{truck.price}</p>

        <p className={styles.description}>{truck.description}</p>
      </div>

      <div className={styles.vehicle}>
        <h2 className={styles.title}>Vehicle details</h2>

        <FeatureBadges key={featureLabels.join("|")} labels={featureLabels} />

        <dl className={styles.details}>
          <div className={styles.detail}>
            <dt>Form</dt>
            <dd>{getLabel(truckFormOptions, truck.form)}</dd>
          </div>

          <div className={styles.detail}>
            <dt>Length</dt>
            <dd>{formatMeasurement(truck.length)}</dd>
          </div>

          <div className={styles.detail}>
            <dt>Width</dt>
            <dd>{formatMeasurement(truck.width)}</dd>
          </div>

          <div className={styles.detail}>
            <dt>Height</dt>
            <dd>{formatMeasurement(truck.height)}</dd>
          </div>

          <div className={styles.detail}>
            <dt>Tank</dt>
            <dd>{formatMeasurement(truck.tank)}</dd>
          </div>

          <div className={styles.detail}>
            <dt>Consumption</dt>
            <dd>{formatConsumption(truck.consumption)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
