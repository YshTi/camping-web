import { notFound } from "next/navigation";

import Container from "@/components/container/container";
import TruckGallery from "@/components/truck-gallery/truck-gallery";

import { getTruckById } from "@/lib/api/catalog";
import type { Truck } from "@/types/truck";

import styles from "./page.module.css";

interface CamperDetailsPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;

  let truck: Truck;

  try {
    truck = await getTruckById(camperId);
  } catch {
    notFound();
  }

  return (
    <Container className={styles.container}>
      <section className={styles.topSection}>
        <TruckGallery
          images={truck.gallery}
          truckName={truck.name}
        />
      </section>
    </Container>
  );
}