import styles from "./not-found.module.css";
import { Button, ButtonLink } from "@/components/buttons/buttons";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";

interface NotFoundProps {
  title?: string;
  message?: string;
  onClearFilters: () => void;
}

export default function NotFound({
  title = "No campers found",
  message = "We couldn`t find any campers that match your filters. \n Try adjusting your search or clearing some filters.",
  onClearFilters,
}: NotFoundProps) {
  return (
    <div className={styles.empty} role="status">
      <Image
        src="/images/not-found.webp"
        alt="Trucks with your filters not found"
        loading="eager"
        width={488}
        height={463}
        className={styles.notFoundImg}
      />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      
      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          onClick={onClearFilters}
          className={styles.button}
        >
          <IoCloseOutline 
            className={styles.closeIcon}
            aria-hidden="true"
          />
          Clear filters
        </Button>

        <ButtonLink
          href="/catalog"
          variant="primary"
          onClick={onClearFilters}
          className={styles.button}
        >
          View all campers
        </ButtonLink>
      </div>
    </div>
  );
}