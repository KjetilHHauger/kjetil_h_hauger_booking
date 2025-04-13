import { useState } from "react";
import { useVenues } from "../hooks/useVenues";
import Filter from "../components/Filter";
import VenueCard from "../components/VenueCard";
import HeroVideo from "../components/HeroVideo";

export default function Home() {
  const { venues, loading, error } = useVenues();

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

  const filteredVenues = venues
    .filter((venue) =>
      filterOptions.every(({ key }) => !filters[key] || venue.meta?.[key])
    )
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

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error loading venues.</p>;

  return (
    <div className="w-full mx-auto">
      <HeroVideo />
      <section className="mx-auto px-4 sm:px-10 md:px-20">
        <h1 className="text-2xl font-bold mb-6 mt-6">Available Venues</h1>
        <Filter
          filters={filters}
          setFilters={setFilters}
          options={filterOptions}
        />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>
    </div>
  );
}
