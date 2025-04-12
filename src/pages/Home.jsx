import { useVenues } from "..//hooks/useVenues";

export default function Home() {
  const { venues, loading, error } = useVenues();

  if (loading) return <p>Loading venues...</p>;
  if (error) {
    return (
      <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded">
        <h2 className="font-semibold">Something went wrong</h2>
        <p>{error.message || "Could not load venues."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Available Venues</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="border p-4 rounded-lg shadow flex flex-col bg-white"
          >
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
            {venue.media?.[0]?.url && (
              <img
                src={
                  venue.media?.[0]?.url ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={venue.media?.[0]?.alt || "Venue"}
                className="mt-2 rounded-md object-cover h-40 w-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
