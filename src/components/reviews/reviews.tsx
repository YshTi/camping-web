"use client";

import { FaStar } from "react-icons/fa6";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { TruckReview } from "@/types/truck";

import "swiper/css";

import styles from "./reviews.module.css";

interface ReviewsProps {
  reviews: TruckReview[];
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

function ReviewCard({ review }: { review: TruckReview }) {
  const rating = Math.round(review.reviewer_rating);

  return (
    <article className={styles.item}>
      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          {getInitial(review.reviewer_name)}
        </div>

        <div className={styles.reviewer}>
          <h3 className={styles.name}>
            {review.reviewer_name}
          </h3>

          <div
            className={styles.rating}
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={
                  index < rating
                    ? styles.starFilled
                    : styles.starEmpty
                }
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <p className={styles.comment}>
        {review.comment}
      </p>
    </article>
  );
}

export default function Reviews({ reviews }: ReviewsProps) {
  if (reviews.length === 0) {
    return (
      <section className={styles.empty}>
        <p>No reviews yet.</p>
      </section>
    );
  }

  const useSlider = reviews.length > 2;

  return (
    <section
      className={styles.reviews}
    >

      {useSlider ? (
        <Swiper
          className={styles.slider}
          modules={[A11y, Mousewheel]}
          direction="vertical"
          slidesPerView={2}
          slidesPerGroup={1}
          spaceBetween={24}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          grabCursor
          watchOverflow
        >
          {reviews.map((review) => (
            <SwiperSlide
              className={styles.slide}
              key={review.id}
            >
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}