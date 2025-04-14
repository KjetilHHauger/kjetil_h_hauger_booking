import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(2);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      location,
      guests,
    }).toString();
    navigate(`/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
      <input
        type="text"
        placeholder="So where do you want to relax?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="How many guests"
        min="1"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-brand-secondary hover:bg-brand-secondary-hover text-white py-2 px-4 rounded"
      >
        Search
      </button>
    </form>
  );
}
