import Link from "next/link";
import type { VenueJson } from "../../interface";
import Card from "./Card";

interface VenueCatalogProps {
  venuesJson: Promise<VenueJson> | VenueJson;
}

export default async function VenueCatalog({ venuesJson }: VenueCatalogProps) {
  const json = await Promise.resolve(venuesJson);
  const venues = json.data ?? [];

  return (
    <section className="flex flex-wrap gap-6 justify-center p-8">
      {venues.map((venue) => (
        <Link key={venue.id} href={`/venue/${venue.id}`}>
          <Card
            venueName={venue.name}
            imgSrc={venue.picture}
          />
        </Link>
      ))}
    </section>
  );
}
