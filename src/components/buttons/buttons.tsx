import Link from "next/link";
import type {
  ComponentProps,
  ReactNode,
} from "react";

import styles from "./buttons.module.css";

type ButtonVariant = "primary" | "secondary";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type ButtonProps = Omit<
  ComponentProps<"button">,
  "children" | "className"
> &
  BaseProps;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = Omit<
  ComponentProps<typeof Link>,
  "children" | "className"
> &
  BaseProps;

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}