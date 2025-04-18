import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { useVenues } from "../hooks/useVenues";
import VenueCard from "../components/VenueCard";
import Pagination from "../components/Pagination";
import FilterAside from "../components/FilterAside";
import SearchForm from "../components/SearchForm";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

export default function Results() {
  const { venues, loading, error } = useVenues();
  const [searchParams] = useSearchParams();
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

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
    { key: "pets", label: "Allows pets" },
    { key: "breakfast", label: "Includes breakfast" },
    { key: "parking", label: "Has parking" },
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, location, guests, checkIn, checkOut]);

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

  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const paginatedVenues = filteredVenues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            {showFilters ? (
              <CaretUp size={16} weight="bold" />
            ) : (
              <CaretDown size={16} weight="bold" />
            )}
          </button>
        </div>

        <div
          className={`${showFilters ? "block" : "hidden"} md:block md:mt-54`}
        >
          <FilterAside
            filters={filters}
            setFilters={setFilters}
            options={filterOptions}
          />
        </div>
      </aside>

      <section className="flex-1">
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
          {paginatedVenues.map((venue, index) => (
            <VenueCard key={`${venue.id}-${index}`} venue={venue} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </section>
  );
}
