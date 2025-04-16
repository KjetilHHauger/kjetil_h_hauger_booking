import { useState } from "react";
import MetaIcons from "../components/MetaIcons";
import brokenImage from "../assets/brokenImage.png";

function getValidImage(media = []) {
  const validImage = media.find((img) => img?.url?.trim());
  return validImage?.url;
}

export default function VenueCard({ venue }) {
  const fallback = brokenImage;
  const originalImage = getValidImage(venue.media);
  const [imgSrc, setImgSrc] = useState(originalImage || fallback);
  const [isBroken, setIsBroken] = useState(!originalImage);

  const handleImageError = () => {
    setImgSrc(fallback);
    setIsBroken(true);
  };

  return (
    <div className="py-4 rounded-lg flex flex-col">
      <img
        src={imgSrc}
        alt={venue.media?.[0]?.alt || "Venue"}
        onError={handleImageError}
        loading="lazy"
        className={`mt-2 rounded-md ${
          isBroken ? "object-contain" : "object-cover"
        } h-56 w-full`}
      />

      <h2 className="text-heading-5 font-bold truncate">{venue.name}</h2>
      <p className="line-clamp-3 text-body-xs mb-2 break-words">
        Location: {venue.location.city}, {venue.location.country}
      </p>

      <MetaIcons meta={venue.meta} />

      <div className="flex justify-between items-center mb-2 text-body-xs">
        <p>
          <strong>Price:</strong> {venue.price} per night
        </p>
        <p>
          <strong>Bed rooms:</strong> {venue.maxGuests}
        </p>
      </div>
    </div>
  );
}
