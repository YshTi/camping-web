"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/container/container";
import Logo from "@/components/logo/logo";
import styles from "./header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname.startsWith("/catalog");

  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <Logo />

        <nav className={styles.nav} aria-label="Main navigation">
            <Link
            className={`${styles.link} ${
                isHomeActive ? styles.active : ""
            }`}
            href="/"
            >
            Home
            </Link>

            <Link
            className={`${styles.link} ${
                isCatalogActive ? styles.active : ""
            }`}
            href="/catalog"
            >
            Catalog
            </Link>
        </nav>
      </Container>
    </header>
  );
}