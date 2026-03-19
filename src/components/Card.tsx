import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";

interface CardProps {
  venueName?: string;
  imgSrc?: string;
  rating?: number;
  onRatingChange?: (value: number | null) => void;
}

const ratingTestId = (venueName: string) => `${venueName} Rating`;

function toEmbeddableUrl(src: string): string {
  if (src.includes("drive.google.com")) {
    return `/api/image-proxy?url=${encodeURIComponent(src)}`;
  }
  return src;
}

export default function Card({
  venueName = "Venue",
  imgSrc = "",
  rating,
  onRatingChange,
}: CardProps) {
  const showRating = rating !== undefined && onRatingChange !== undefined;

  return (
    <InteractiveCard>
      <div className="w-72 overflow-hidden rounded-lg">
        <div className="w-full h-48 overflow-hidden">
          <img src={toEmbeddableUrl(imgSrc)} alt={venueName} className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <h2 className="text-lg font-bold text-gray-900">{venueName}</h2>
          {showRating && (
            <Rating
              value={rating ?? 0}
              onChange={(_, newValue) => onRatingChange?.(newValue ?? 0)}
              id={ratingTestId(venueName)}
              name={ratingTestId(venueName)}
              data-testid={ratingTestId(venueName)}
            />
          )}
        </div>
      </div>
    </InteractiveCard>
  );
}
