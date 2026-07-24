import { Button } from "@/components/buttons/buttons";
import Loader from "@/components/loader/loader";
import styles from "./pagination.module.css";

interface PaginationProps {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isLoading?: boolean;
}

export default function Pagination({
  onLoadMore,
  hasNextPage,
  isLoading = false,
}: PaginationProps) {
  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  if (!hasNextPage) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <Button type="button" variant="secondary" onClick={onLoadMore}>
        Load More
      </Button>
    </div>
  );
}
