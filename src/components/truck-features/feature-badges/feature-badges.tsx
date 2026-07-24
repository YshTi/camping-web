"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import styles from "./feature-badges.module.css";

interface FeatureBadgesProps {
  labels: string[];
}

export default function FeatureBadges({
  labels,
}: FeatureBadgesProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure || isExpanded) {
      return;
    }

    const calculateVisibleCount = () => {
      const availableWidth = container.clientWidth;

      const badges = Array.from(
        measure.querySelectorAll<HTMLElement>(
          "[data-measure-badge]",
        ),
      );

      const detailsButton =
        measure.querySelector<HTMLElement>(
          "[data-measure-details]",
        );

      const gap = 8;
      const detailsButtonWidth =
        detailsButton?.offsetWidth ?? 0;

      let usedWidth = 0;
      let count = 0;

      for (let index = 0; index < badges.length; index += 1) {
        const badgeWidth = badges[index].offsetWidth;

        const widthBeforeBadge =
          index === 0 ? 0 : gap;

        const nextUsedWidth =
          usedWidth + widthBeforeBadge + badgeWidth;

        const itemsRemain =
          index < badges.length - 1;

        const reservedDetailsWidth = itemsRemain
          ? gap + detailsButtonWidth
          : 0;

        if (
          nextUsedWidth + reservedDetailsWidth >
          availableWidth
        ) {
          break;
        }

        usedWidth = nextUsedWidth;
        count += 1;
      }

      setVisibleCount(count);
    };

    const frameId = requestAnimationFrame(
      calculateVisibleCount,
    );

    const resizeObserver = new ResizeObserver(
      calculateVisibleCount,
    );

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [labels, isExpanded]);

  const hiddenCount = labels.length - visibleCount;

  return (
    <>
      <ul
        ref={containerRef}
        className={`${styles.badges} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        {(isExpanded
          ? labels
          : labels.slice(0, visibleCount)
        ).map((label) => (
          <li className={styles.badge} key={label}>
            {label}
          </li>
        ))}

        {!isExpanded && hiddenCount > 0 && (
          <li>
            <button
              className={styles.detailsButton}
              type="button"
              onClick={() => setIsExpanded(true)}
            >
              Show more
            </button>
          </li>
        )}

        {isExpanded && (
          <li>
            <button
              className={styles.detailsButton}
              type="button"
              onClick={() => setIsExpanded(false)}
            >
              Show less
            </button>
          </li>
        )}
      </ul>

      <div
        ref={measureRef}
        className={styles.measure}
        aria-hidden="true"
      >
        {labels.map((label) => (
          <span
            className={styles.badge}
            data-measure-badge
            key={label}
          >
            {label}
          </span>
        ))}

        <span
          className={styles.detailsButton}
          data-measure-details
        >
          All details
        </span>
      </div>
    </>
  );
}