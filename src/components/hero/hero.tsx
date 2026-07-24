import styles from "./hero.module.css";
import { ButtonLink } from "../buttons/buttons";
import Container from "@/components/container/container";

import Image from "next/image";
import heroImage from "../../../public/images/hero.webp";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        className={styles.background}
        src={heroImage}
        alt="Camper in nature during the sunset next to the lake"
        fill
        preload
        sizes="100vw"
      />

      <Container className={styles.heroContainer}>
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>

          <p className={styles.text}>
            You can find everything you want in our catalog
          </p>
        </div>
        <ButtonLink href="/catalog" variant="primary">
          View Now
        </ButtonLink>
      </Container>
    </section>
  );
}
