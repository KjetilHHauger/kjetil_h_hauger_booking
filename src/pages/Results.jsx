import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Fuse from "fuse.js";
import { useVenues } from "../hooks/useVenues";
import VenueCard from "../components/VenueCard";
import Filter from "../components/Filter";
import SearchForm from "../components/SearchForm";

export default function Results() {
  const { venues, loading, error } = useVenues();
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location")?.toLowerCase() || "";
  const guests = parseInt(searchParams.get("guests"), 10) || 1;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const [filters, setFilters] = useState({
    wifi: false,
    pets: false,
    breakfast: false,
    parking: false,
    sortBy: "price",
    sortOrder: "asc",
  });

  const filterOptions = [
    { key: "wifi", label: "Has Wifi" },
    { key: "pets", label: "Allows Pets" },
    { key: "breakfast", label: "Includes Breakfast" },
    { key: "parking", label: "Has Parking" },
  ];

  const fuse = new Fuse(venues, {
    keys: ["location.city", "location.country", "location.continent"],
    threshold: 0.3,
  });

  const matchedVenues = location
    ? fuse.search(location).map((result) => result.item)
    : venues;

  const dateRangeOverlaps = (booking) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const bookingStart = new Date(booking.dateFrom);
    const bookingEnd = new Date(booking.dateTo);

    return checkInDate < bookingEnd && checkOutDate > bookingStart;
  };

  const filteredVenues = matchedVenues
    .filter((venue) => {
      const fitsGuests = venue.maxGuests >= guests;

      const availableDates =
        !checkIn || !checkOut ? true : !venue.bookings?.some(dateRangeOverlaps);

      const passesFilter = filterOptions.every(
        ({ key }) => !filters[key] || venue.meta?.[key]
      );

      return fitsGuests && availableDates && passesFilter;
    })
    .sort((a, b) => {
      if (filters.sortBy === "price") {
        return filters.sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }
      if (filters.sortBy === "rating") {
        return filters.sortOrder === "asc"
          ? a.rating - b.rating
          : b.rating - a.rating;
      }
      return 0;
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading venues.</p>;

  return (
    <section className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row">
      <aside className="w-72 mr-6">
        <Filter
          filters={filters}
          setFilters={setFilters}
          options={filterOptions}
        />
      </aside>
      <section>
        <h1 className="text-heading-2 mb-4">Search Results</h1>
        <p className="text-body-sm mb-6">
          Found {filteredVenues.length} result
          {filteredVenues.length !== 1 ? "s" : ""}
        </p>

        <div className="mb-8">
          <p className="mb-2 text-sm text-gray-600">
            Want to try another place?
          </p>
          <SearchForm
            defaultLocation={location}
            defaultGuests={guests}
            defaultCheckIn={checkIn}
            defaultCheckOut={checkOut}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>
    </section>
  );
}
