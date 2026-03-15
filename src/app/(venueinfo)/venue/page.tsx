import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";

export default async function VenuePage() {
  return (
    <main>
      <VenueCatalog venuesJson={getVenues()} />
    </main>
  );
}
