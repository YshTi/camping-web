import type { HTMLAttributes, ReactNode } from "react";
import styles from "./container.module.css";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
}