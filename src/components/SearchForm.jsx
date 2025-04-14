import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchForm({
  defaultLocation = "",
  defaultGuests = 2,
  defaultCheckIn = null,
  defaultCheckOut = null,
}) {
  const [location, setLocation] = useState(defaultLocation);
  const [guests, setGuests] = useState(defaultGuests);
  const [startDate, setStartDate] = useState(
    defaultCheckIn ? new Date(defaultCheckIn) : null
  );
  const [endDate, setEndDate] = useState(
    defaultCheckOut ? new Date(defaultCheckOut) : null
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      location,
      guests,
      checkIn: startDate?.toISOString() || "",
      checkOut: endDate?.toISOString() || "",
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

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        placeholderText="Pick your leave date"
        className="border p-2 rounded"
        dateFormat="yyyy-MM-dd"
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Pick your return date"
        className="border p-2 rounded"
        dateFormat="yyyy-MM-dd"
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
        className="bg-brand-secondary hover:bg-brand-secondary-hover text-white py-2 px-4 rounded cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
