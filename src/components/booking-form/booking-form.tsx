"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

import { Button } from "@/components/buttons/buttons";
import { pushNotification } from "@/components/push-notifications/push-notifications";
import { createBookingRequest } from "@/lib/api/bookingApi";
import { MdOutlineErrorOutline } from "react-icons/md";

import styles from "./booking-form.module.css";

interface BookingFormProps {
  camperId: string;
  camperName: string;
}

interface BookingFormValues {
  name: string;
  email: string;
}

const initialValues: BookingFormValues = {
  name: "",
  email: "",
};

const nameRegex = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u;
const emailRegex =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const validationSchema: yup.ObjectSchema<BookingFormValues> =
  yup.object({
    name: yup
      .string()
      .trim()
      .min(4, "Please enter your full name.")
      .matches(
        nameRegex,
        "Name may contain only letters, spaces, hyphens, and apostrophes between letters.",
      )
      .required("Name is required."),
    email: yup
      .string()
      .trim()
      .matches(
        emailRegex,
        "Please enter a valid email address with a complete domain.",
      )
      .required("Email is required."),
  });

export default function BookingForm({
  camperId,
  camperName,
}: BookingFormProps) {
  return (
    <section
      className={styles.booking}
      aria-labelledby="booking-title"
    >
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 id="booking-title" className={styles.title}>
            Book your campervan now
          </h2>

          <p className={styles.subtitle}>
            Stay connected! We are always ready to help you.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          validateOnBlur
          validateOnChange={false}
          onSubmit={async (
            values,
            { resetForm, setSubmitting },
          ) => {
            try {
              await createBookingRequest(camperId, {
                name: values.name.trim(),
                email: values.email.trim(),
              });

              pushNotification.success({
                  title: "Booking request accepted",
                  message: `Booking request for «${camperName}» accepted. We will contact you at ${values.email.trim()}.`,
              });

              resetForm();
            } catch {
              pushNotification.error({
                title: "Booking request failed",
                message:
                  "Unable to send your request. Please try again.",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting, isValid, dirty }) => (
            <Form className={styles.form} noValidate>
              <div className={styles.fieldGroup}>
                  <div className={styles.inputWrapper}>
                      <Field
                      id="booking-name"
                      name="name"
                      type="text"
                      placeholder="Name*"
                      autoComplete="name"
                      aria-invalid={Boolean(touched.name && errors.name)}
                      aria-describedby={
                          touched.name && errors.name
                          ? "booking-name-error"
                          : undefined
                      }
                      className={`${styles.input} ${
                          touched.name && errors.name
                          ? styles.inputError
                          : ""
                      }`}
                      />

                      {touched.name && errors.name && (
                          <>
                            <span className={styles.errorLabel}>Name*</span>
                            
                            <MdOutlineErrorOutline
                              className={styles.errorIcon}
                              aria-hidden="true"
                            />
                          </>
                      )}
                  </div>

                  <ErrorMessage name="name">
                      {(message) => (
                      <p
                          id="booking-name-error"
                          className={styles.error}
                      >
                          {message}
                      </p>
                      )}
                  </ErrorMessage>
              </div>

              <div className={styles.fieldGroup}>
                  <div className={styles.inputWrapper}>
                      <Field
                      id="booking-email"
                      name="email"
                      type="email"
                      placeholder="Email*"
                      autoComplete="email"
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={
                          touched.email && errors.email
                          ? "booking-email-error"
                          : undefined
                      }
                      className={`${styles.input} ${
                          touched.email && errors.email
                          ? styles.inputError
                          : ""
                      }`}
                      />

                      {touched.email && errors.email && (
                      <>
                          <span className={styles.errorLabel}>Email*</span>

                          <MdOutlineErrorOutline
                          className={styles.errorIcon}
                          aria-hidden="true"
                          />
                      </>
                      )}
                  </div>

                  <ErrorMessage name="email">
                      {(message) => (
                      <p
                          id="booking-email-error"
                          className={styles.error}
                      >
                          {message}
                      </p>
                      )}
                  </ErrorMessage>
              </div>

              <Button
                  className={styles.submit}
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !isValid || !dirty}
              >
                  {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}