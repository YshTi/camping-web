import Loader from "@/components/loader/loader";

export default function Loading() {
  return (
    <Loader
      title="Loading camper details..."
      message="Please wait while we prepare this camper's information."
    />
  );
}