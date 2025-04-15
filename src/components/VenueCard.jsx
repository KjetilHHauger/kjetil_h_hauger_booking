import { useState } from "react";
import wifiIcon from "../assets/icons/wifi-high.svg";
import petsIcon from "../assets/icons/dog.svg";
import breakfastIcon from "../assets/icons/fork-knife.svg";
import parkingIcon from "../assets/icons/letter-circle-p.svg";
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

      {/* Icons */}
      <section className="flex gap-2 mb-4">
        {[
          { icon: wifiIcon, value: venue.meta.wifi, label: "Wi-Fi" },
          { icon: parkingIcon, value: venue.meta.parking, label: "Parking" },
          { icon: petsIcon, value: venue.meta.pets, label: "Pets" },
          {
            icon: breakfastIcon,
            value: venue.meta.breakfast,
            label: "Breakfast",
          },
        ].map(({ icon, value, label }) => (
          <div key={label} className="relative w-5 h-5">
            <img
              src={icon}
              alt={`${label} ${value ? "available" : "not available"}`}
              className="w-full h-full"
            />
            {!value && (
              <div className="absolute top-[6px] left-[-7px] w-full h-full border-t-2 border-red-500 rotate-45"></div>
            )}
          </div>
        ))}
      </section>

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
