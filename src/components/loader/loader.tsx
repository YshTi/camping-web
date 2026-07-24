import styles from "./loader.module.css";

interface LoaderProps {
  title?: string;
  message?: string;
}

export default function Loader({
  title = "Loading trucks...",
  message = "Please wait while we fetch the best travel trucks for you",
}: LoaderProps) {
  return (
    <div className={styles.overlay}>
      <div
        className={styles.loader}
        role="status"
        aria-live="polite"
        aria-label={title}
      >
        <span className={styles.spinner} aria-hidden="true" />

        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  );
}
