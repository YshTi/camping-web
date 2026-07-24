"use client";

import { useState, type FormEvent } from "react";
import {
  IoCloseOutline,
  IoMapOutline,
} from "react-icons/io5";

import { Button } from "@/components/buttons/buttons";
import type {
  TruckFilterEngine,
  TruckFilterForm,
  TruckFilters,
  TruckFilterTransmission,
} from "@/types/filters";
import {
  engineOptions,
  transmissionOptions,
  truckFormOptions,
} from "@/types/trucks";

import styles from "./catalog-filter.module.css";

const initialFilters: TruckFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

interface CatalogFilterProps {
  initialValue: TruckFilters;
  onSubmit: (filters: TruckFilters) => void;
}

export default function CatalogFilter({
  initialValue,
  onSubmit,
}: CatalogFilterProps) {
  const [filters, setFilters] =
    useState<TruckFilters>(initialValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(filters);
  };

  const handleClear = () => {
    setFilters(initialFilters);
    onSubmit(initialFilters);
  };

  return (
    <aside className={styles.sidebar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.locationGroup}>
          <label className={styles.label} htmlFor="location">
            Location
          </label>

          <div className={styles.inputWrapper}>
            <IoMapOutline
              className={`${styles.locationIcon} ${
                filters.location ? styles.locationIconActive : ""
              }`}
              aria-hidden="true"
            />

            <input
              id="location"
              className={styles.locationInput}
              type="text"
              placeholder="City"
              value={filters.location}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  location: event.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.filters}>
          <h2 className={styles.title}>Filters</h2>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              Camper form
            </legend>

            {truckFormOptions.map((option) => (
              <RadioOption
                key={option.value}
                label={option.label}
                name="form"
                value={option.value}
                checked={filters.form === option.value}
                onChange={(value) =>
                  setFilters((previous) => ({
                    ...previous,
                    form: value as TruckFilterForm,
                  }))
                }
              />
            ))}
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              Engine
            </legend>

            {engineOptions.map((option) => (
              <RadioOption
                key={option.value}
                label={option.label}
                name="engine"
                value={option.value}
                checked={filters.engine === option.value}
                onChange={(value) =>
                  setFilters((previous) => ({
                    ...previous,
                    engine: value as TruckFilterEngine,
                  }))
                }
              />
            ))}
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              Transmission
            </legend>

            {transmissionOptions.map((option) => (
              <RadioOption
                key={option.value}
                label={option.label}
                name="transmission"
                value={option.value}
                checked={filters.transmission === option.value}
                onChange={(value) =>
                  setFilters((previous) => ({
                    ...previous,
                    transmission:
                      value as TruckFilterTransmission,
                  }))
                }
              />
            ))}
          </fieldset>
        </div>

        <div className={styles.actions}>
          <Button type="submit" variant="primary">
            Search
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
          >
            <IoCloseOutline
              className={styles.closeIcon}
              aria-hidden="true"
            />
            Clear filters
          </Button>
        </div>
      </form>
    </aside>
  );
}

interface RadioOptionProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

function RadioOption({
  label,
  name,
  value,
  checked,
  onChange,
}: RadioOptionProps) {
  return (
    <label className={styles.radioLabel}>
      <input
        className={styles.radioInput}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(event.target.value)}
      />

      <span
        className={styles.customRadio}
        aria-hidden="true"
      />

      <span>{label}</span>
    </label>
  );
}