"use client";

import { IoCheckmarkCircle, IoClose, IoCloseCircle } from "react-icons/io5";
import toast, { Toaster, type Toast } from "react-hot-toast";

import styles from "./push-notifications.module.css";

type NotificationType = "success" | "error";

interface NotificationContentProps {
  toastInstance: Toast;
  type: NotificationType;
  title: string;
  message?: string;
}

function NotificationContent({
  toastInstance,
  type,
  title,
  message,
}: NotificationContentProps) {
  const isSuccess = type === "success";

  return (
    <div
      className={`${styles.notification} ${
        toastInstance.visible ? styles.enter : styles.leave
      }`}
      role={type === "error" ? "alert" : "status"}
    >
      <span
        className={`${styles.iconWrapper} ${
          isSuccess ? styles.successIcon : styles.errorIcon
        }`}
        aria-hidden="true"
      >
        {isSuccess ? <IoCheckmarkCircle /> : <IoCloseCircle />}
      </span>

      <div className={styles.content}>
        <p className={styles.title}>{title}</p>

        {message && <p className={styles.message}>{message}</p>}
      </div>

      <button
        className={styles.closeButton}
        type="button"
        onClick={() => toast.dismiss(toastInstance.id)}
        aria-label="Close notification"
      >
        <IoClose aria-hidden="true" />
      </button>
    </div>
  );
}

interface ShowNotificationOptions {
  title: string;
  message?: string;
  duration?: number;
}

function showNotification(
  type: NotificationType,
  { title, message, duration = 4000 }: ShowNotificationOptions,
) {
  return toast.custom(
    (toastInstance) => (
      <NotificationContent
        toastInstance={toastInstance}
        type={type}
        title={title}
        message={message}
      />
    ),
    {
      duration,
    },
  );
}

export const pushNotification = {
  success(options: ShowNotificationOptions) {
    return showNotification("success", options);
  },

  error(options: ShowNotificationOptions) {
    return showNotification("error", options);
  },
};

export default function PushNotification() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: 80,
        right: 48,
      }}
      toastOptions={{
        style: {
          padding: 0,
          background: "transparent",
          boxShadow: "none",
          maxWidth: "none",
        },
      }}
    />
  );
}
