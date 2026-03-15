import type { VenueJson } from "../../interface";

const API_BASE = "https://a08-venue-explorer-backend.vercel.app/api/v1";

export default async function getVenues(): Promise<VenueJson> {
  const res = await fetch(`${API_BASE}/venues`);
  if (!res.ok) throw new Error("Failed to fetch venues");
  const json: VenueJson = await res.json();
  return json;
}
