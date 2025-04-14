import { useSearchParams } from "react-router-dom";
import { useVenues } from "../hooks/useVenues";
import VenueCard from "../components/VenueCard";
import Fuse from "fuse.js";

export default function Results() {
  const { venues, loading, error } = useVenues();
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location")?.toLowerCase();
  const guests = parseInt(searchParams.get("guests"), 10) || 1;

  const fuse = new Fuse(venues, {
    keys: ["location.city", "location.country", "location.continent"],
    threshold: 0.3,
  });

  const matchedVenues = location
    ? fuse.search(location).map((result) => result.item)
    : venues;

  const filtered = matchedVenues.filter((venue) => {
    const fitsGuests = venue.maxGuests >= guests;
    return fitsGuests;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading venues.</p>;

  return (
    <section className="px-6 max-w-6xl mx-auto">
      <h1 className="text-heading-2 mb-4">Search Results</h1>
      <p className="text-body-sm mb-6">
        Found {filtered.length} result{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </section>
  );
}
