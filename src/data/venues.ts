export type VenueItem = {
  vid: string;
  name: string;
  imgSrc: string;
};

export const VENUES: VenueItem[] = [
  {
    vid: "001",
    name: "The Bloom Pavilion",
    imgSrc: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  },
  {
    vid: "002",
    name: "Spark Space",
    imgSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
  },
  {
    vid: "003",
    name: "The Grand Table",
    imgSrc: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  },
];

export const VENUES_MAP = new Map<string, VenueItem>(VENUES.map((v) => [v.vid, v]));
