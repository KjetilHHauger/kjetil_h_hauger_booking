import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${BASE_URL}/holidaze/venues/${id}`);
        if (!res.ok) {
          throw new Error("Venue not found");
        }
        const data = await res.json();
        setVenue(data.data);
      } catch (err) {
        console.error("Error loading venue:", err);
        setVenue(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) return <p>Loading venue...</p>;
  if (!venue) return <p>Venue not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-heading-3 font-bold mb-4">{venue.name}</h1>
      <img
        src={venue.media?.[0]?.url}
        alt={venue.media?.[0]?.alt || venue.name}
        className="w-full h-72 object-cover rounded mb-4"
      />
      <p className="mb-4">{venue.description}</p>
      <p className="mb-2 font-medium">Price: {venue.price} / night</p>
      <p className="mb-2 font-medium">Max guests: {venue.maxGuests}</p>
      <p className="mb-2 font-medium">
        Location: {venue.location?.address}, {venue.location?.city},{" "}
        {venue.location?.country}
      </p>
    </div>
  );
}
