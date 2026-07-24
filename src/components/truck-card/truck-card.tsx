import Image from "next/image";

import { IoMapOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { BsFuelPumpFill } from "react-icons/bs";
import { ButtonLink } from "@/components/buttons/buttons";
import { TbManualGearbox } from "react-icons/tb";
import { RiCarFill } from "react-icons/ri";

import type { Truck } from "@/types/truck";
import {
  engineOptions,
  transmissionOptions,
  truckFormOptions,
} from "@/types/trucks";

import styles from "./truck-card.module.css";

interface TruckCardProps {
  truck: Truck;
}

function getLabel(
  options: readonly { label: string; value: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export default function TruckCard({ truck }: TruckCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={truck.coverImage}
          alt={truck.name}
          fill
          sizes="264px"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topInfo}>
          <div className={styles.top}>
            <h2 className={styles.title}>{truck.name}</h2>

            <p className={styles.price}>
              €{truck.price.toLocaleString("en-US")}
            </p>
          </div>

          <div className={styles.meta}>
            <span className={styles.rating}>
              <FaStar className={styles.star} aria-hidden="true" />
              {truck.rating}({truck.totalReviews} Reviews)
            </span>

            <span className={styles.location}>
              <IoMapOutline className={styles.locationSvg} aria-hidden="true" />
              {truck.location}
            </span>
          </div>
        </div>

        <p className={styles.description}>{truck.description}</p>

        <ul className={styles.badges}>
          <li className={styles.badge}>
            <BsFuelPumpFill aria-hidden="true" />
            {getLabel(engineOptions, truck.engine)}
          </li>

          <li className={styles.badge}>
            <TbManualGearbox aria-hidden="true" className={styles.gearbox} />
            {getLabel(transmissionOptions, truck.transmission)}
          </li>

          <li className={styles.badge}>
            <RiCarFill aria-hidden="true" />
            {getLabel(truckFormOptions, truck.form)}
          </li>
        </ul>

        <ButtonLink
          href={`/catalog/${truck.id}`}
          variant="primary"
          target="_blank"
          className={styles.link}
        >
          Show more
        </ButtonLink>
      </div>
    </article>
  );
}
