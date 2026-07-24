"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import {
  A11y,
  FreeMode,
  Keyboard,
  Mousewheel,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { TruckGalleryImage } from "@/types/truck";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./truck-gallery.module.css";

interface TruckGalleryProps {
  images: TruckGalleryImage[];
  truckName: string;
}

export default function TruckGallery({
  images,
  truckName,
}: TruckGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperType | null>(null);

  const sortedImages = [...images].sort(
    (first, second) => first.order - second.order,
  );

  if (sortedImages.length === 0) {
    return (
      <div className={styles.empty}>
        No images available
      </div>
    );
  }

  const canLoop = sortedImages.length > 1;

  return (
    <section
      className={styles.gallery}
      aria-label={`${truckName} image gallery`}
    >
      <Swiper
        className={styles.mainSlider}
        modules={[
          A11y,
          Keyboard,
          Mousewheel,
          Thumbs,
        ]}
        keyboard={{
          enabled: true,
        }}
        mousewheel={{
            forceToAxis: true,
            releaseOnEdges: false,
            sensitivity: 0.4,
            thresholdDelta: 20,
            thresholdTime: 500,
        }}
        preventInteractionOnTransition
        speed={500}
        loop={canLoop}
        spaceBetween={16}
        slidesPerGroup={1}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
      >
        {sortedImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className={styles.mainImageWrapper}>
              <Image
                className={styles.mainImage}
                src={image.original}
                alt={`${truckName}, image ${index + 1}`}
                fill
                draggable={false}
                priority={index === 0}
                sizes="638px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {sortedImages.length > 1 && (
        <Swiper
          className={styles.thumbnailSlider}
          modules={[
            A11y,
            FreeMode,
            Thumbs,
          ]}
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={32}
          freeMode
          watchSlidesProgress
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {sortedImages.map((image, index) => (
            <SwiperSlide key={image.id}>
              <button
                className={styles.thumbnailButton}
                type="button"
                aria-label={`Show image ${index + 1} of ${truckName}`}
              >
                <Image
                  className={styles.thumbnailImage}
                  src={image.thumb || image.original}
                  alt=""
                  fill
                  sizes="140px"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}