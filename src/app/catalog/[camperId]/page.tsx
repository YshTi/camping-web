import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Container from "@/components/container/container";
import TruckGallery from "@/components/truck-gallery/truck-gallery";
import TruckFeatures from "@/components/truck-features/truck-features";
import Reviews from "@/components/reviews/reviews";
import BookingForm from "@/components/booking-form/booking-form";

import { getTruckById, getTruckReviews } from "@/lib/api/catalog";

import type { Truck, TruckReview } from "@/types/truck";

import styles from "./page.module.css";

interface CamperDetailsPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

export async function generateMetadata({
  params,
}: CamperDetailsPageProps): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const truck = await getTruckById(camperId);

    return {
      title: truck.name,
      description: truck.description,
      openGraph: {
        title: `${truck.name} | TravelTrucks`,
        description: truck.description,
        images: truck.gallery?.[0]?.original
          ? [truck.gallery[0].original]
          : [],
      },
    };
  } catch {
    return {
      title: "Camper not found",
      description: "The requested camper could not be found.",
    };
  }
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
  } catch {
    notFound();
  }

  return (
    <Container className={styles.camperContainer}>
      <section className={styles.topSection}>
        <TruckGallery images={truck.gallery} truckName={truck.name} />

        <TruckFeatures truck={truck} />
      </section>
      <section aria-labelledby="reviews-title" className={styles.bottomSection}>
        <h2 id="reviews-title" className={styles.reviewsTitle}>
          Reviews
        </h2>

        <div className={styles.reviewsContent}>
          <Reviews reviews={reviews} />

          <BookingForm camperId={truck.id} camperName={truck.name} />
        </div>
      </section>
    </Container>
  );
}
