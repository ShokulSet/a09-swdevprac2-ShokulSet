import type { VenueItem } from "../../interface";

const API_BASE = "https://a08-venue-explorer-backend.vercel.app/api/v1";

export interface VenueDetailJson {
  success: boolean;
  data: VenueItem;
}

export default async function getVenue(vid: string): Promise<VenueDetailJson> {
  const res = await fetch(`${API_BASE}/venues/${vid}`);
  if (!res.ok) throw new Error("Failed to fetch venue");
  const json: VenueDetailJson = await res.json();
  return json;
}
