import { notFound } from "next/navigation";

import Container from "@/components/container/container";
import TruckGallery from "@/components/truck-gallery/truck-gallery";
import TruckFeatures from "@/components/truck-features/truck-features";
import Reviews from "@/components/reviews/reviews";

import {
  getTruckById,
  getTruckReviews,
} from "@/lib/api/catalog";

import type {
  Truck,
  TruckReview,
} from "@/types/truck";

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
  let reviews: TruckReview[];

  try {
    [truck, reviews] = await Promise.all([
      getTruckById(camperId),
      getTruckReviews(camperId),
    ]);

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

        <TruckFeatures truck={truck} />
      </section>
      <section className={styles.bottomSection}> 
        <Reviews reviews={reviews} />
      </section>
    </Container>
  );
}