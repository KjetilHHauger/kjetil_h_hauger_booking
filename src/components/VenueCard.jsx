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
      <p>
        <strong>Guests:</strong> {venue.maxGuests}
      </p>
    </div>
  );
}
