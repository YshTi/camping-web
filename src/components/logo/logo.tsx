import Link from "next/link";
import styles from "./logo.module.css";

export default function Logo() {
  return (
    <Link className={styles.logo} href="/" aria-label="TravelTrucks home">
      <span className={styles.accent}>Travel</span>Trucks
    </Link>
  );
}