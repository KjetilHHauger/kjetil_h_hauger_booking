import wifiIcon from "../assets/icons/wifi-high.svg";
import petsIcon from "../assets/icons/dog.svg";
import breakfastIcon from "../assets/icons/fork-knife.svg";
import parkingIcon from "../assets/icons/letter-circle-p.svg";
import brokenImage from "../assets/brokenImage.png";

function getValidImage(media = []) {
  if (!Array.isArray(media) || media.length === 0) {
    return brokenImage;
  }

  const validImage = media.find((img) => img?.url && img.url.trim() !== "");

  return validImage?.url || brokenImage;
}

export default function VenueCard({ venue }) {
  const imageUrl = getValidImage(venue.media);
  const isBrokenImage = imageUrl === brokenImage;

  return (
    <div className="py-4 rounded-lg flex flex-col ">
      <img
        src={imageUrl}
        alt="Venue"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = brokenImage;
        }}
        className={`mt-2 rounded-md ${
          isBrokenImage ? "object-contain" : "object-cover"
        } h-56 w-full`}
      />

      <h2 className="text-heading-5 font-bold truncate">{venue.name}</h2>
      <p className="line-clamp-3 text-body-xs mb-2 break-words">
        Location: {venue.location.city}, {venue.location.country}
      </p>
      <section className="flex gap-2 mb-4">
        <div className="flex items-center gap-2">
          {/* Wifi */}
          <div className="relative w-5 h-5">
            <img
              src={wifiIcon}
              alt={venue.meta.wifi ? "Wi-Fi available" : "Wi-Fi not available"}
              className="w-full h-full"
            />
            {!venue.meta.wifi && (
              <div className="absolute top-[6px] left-[-7px] w-full h-full border-t-2 border-red-500 rotate-45"></div>
            )}
          </div>
        </div>
        {/* Parking */}
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5">
            <img
              src={parkingIcon}
              alt={
                venue.meta.parking
                  ? "Parking available"
                  : "Parking not available"
              }
              className="w-full h-full"
            />
            {!venue.meta.parking && (
              <div className="absolute top-[6px] left-[-7px] w-full h-full border-t-2 border-red-500 rotate-45"></div>
            )}
          </div>
        </div>
        {/* Pets */}
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5">
            <img
              src={petsIcon}
              alt={venue.meta.pets ? "Pets allowed" : "Pets not allowed"}
              className="w-full h-full"
            />
            {!venue.meta.pets && (
              <div className="absolute top-[6px] left-[-7px] w-full h-full border-t-2 border-red-500 rotate-45"></div>
            )}
          </div>
        </div>
        {/* Breakfast */}
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5">
            <img
              src={breakfastIcon}
              alt={
                venue.meta.breakfast
                  ? "Breakfast available"
                  : "Breakfast not available"
              }
              className="w-full h-full"
            />
            {!venue.meta.breakfast && (
              <div className="absolute top-[6px] left-[-7px] w-full h-full border-t-2 border-red-500 rotate-45"></div>
            )}
          </div>
        </div>
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
