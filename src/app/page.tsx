import Hero from "@/components/hero/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | TravelTrucks",
  description:
    "Explore and book the campervan of your dreams with TravelTrucks.",
};

export default function HomePage() {
  return <Hero />;
}
