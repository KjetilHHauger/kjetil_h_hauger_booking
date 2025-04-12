import wifiIcon from "../assets/icons/wifi-high.svg";
import petsIcon from "../assets/icons/dog.svg";
import breakfastIcon from "../assets/icons/fork-knife.svg";
import parkingIcon from "../assets/icons/letter-circle-p.svg";

export default function VenueCard({ venue }) {
  return (
    <div className="border p-4 rounded-lg shadow flex flex-col bg-white">
      {venue.media?.[0]?.url && (
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt || "Venue"}
          className="mt-2 rounded-md object-cover h-40 w-full"
        />
      )}
      <h2 className="text-lg font-bold truncate">{venue.name}</h2>
      <p className="line-clamp-3 text-sm text-gray-600 mb-2 break-words">
        {venue.description}
      </p>
      <p>
        <strong>Price:</strong> {venue.price} / night
      </p>
      <div className="flex gap-2 mb-2 mt-2">
        <p className="flex items-center gap-2">
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
        </p>
        {/* Parking */}
        <p className="flex items-center gap-2">
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
        </p>
        {/* Pets */}
        <p className="flex items-center gap-2">
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
        </p>
        {/* Breakfast */}
        <p className="flex items-center gap-2">
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
        </p>
      </div>

      <p>
        <strong>Guests:</strong> {venue.maxGuests}
      </p>
    </div>
  );
}
