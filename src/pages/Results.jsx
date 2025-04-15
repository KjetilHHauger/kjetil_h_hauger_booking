import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Fuse from "fuse.js";
import { useVenues } from "../hooks/useVenues";
import VenueCard from "../components/VenueCard";
import Filter from "../components/Filter";
import SearchForm from "../components/SearchForm";
import CaretDown from "../assets/icons/caret-down.svg";
import CaretUp from "../assets/icons/caret-up.svg";

export default function Results() {
  const { venues, loading, error } = useVenues();
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location")?.toLowerCase() || "";
  const guests = parseInt(searchParams.get("guests"), 10) || 1;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const [showFilters, setShowFilters] = useState(false);

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
    { key: "pets", label: "Allows pets" },
    { key: "breakfast", label: "Includes breakfast" },
    { key: "parking", label: "Has parking" },
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
    <section className="px-6 w-full mx-auto flex flex-col md:flex-row">
      <aside className="w-full md:w-72 mr-6">
        <div className="md:hidden mt-6">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex justify-between items-center gap-2 text-sm font-medium bg-brand-secondary text-white px-4 py-2 rounded w-full"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
            <img
              src={showFilters ? CaretUp : CaretDown}
              alt="Toggle Filters"
              className="w-4 h-4 text-white"
            />
          </button>
        </div>
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <Filter
            filters={filters}
            setFilters={setFilters}
            options={filterOptions}
          />
        </div>
      </aside>
      <section>
        <div className="mb-8">
          <SearchForm
            defaultLocation={location}
            defaultGuests={guests}
            defaultCheckIn={checkIn}
            defaultCheckOut={checkOut}
          />
        </div>
        <h1 className="text-heading-3 mb-4">Search Results</h1>
        <p className="text-body-sm mb-6">
          Found {filteredVenues.length} result
          {filteredVenues.length !== 1 ? "s" : ""}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>
    </section>
  );
}
