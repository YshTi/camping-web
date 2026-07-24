import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const api = axios.create({
  baseURL: apiUrl,
});

export interface BookingRequest {
  name: string;
  email: string;
}

export async function createBookingRequest(
  camperId: string,
  booking: BookingRequest,
): Promise<void> {
  await api.post(
    `/campers/${camperId}/booking-requests`,
    booking,
  );
}