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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 w-full max-w-5xl mx-auto"
    >
      <div className="flex flex-col md:flex-1">
        <input
          type="text"
          placeholder="f.eks. Oslo"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex flex-col md:flex-1">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          placeholderText="Pick your leave date"
          className="border p-2 rounded w-full"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="flex flex-col md:flex-1">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Pick your return date"
          className="border p-2 rounded w-full"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="flex flex-col md:flex-1">
        <input
          type="number"
          placeholder="How many guests"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex flex-col md:flex-1">
        <button
          type="submit"
          className="bg-brand-secondary hover:bg-brand-secondary-hover text-white py-2 px-4 rounded w-full"
        >
          Search
        </button>
      </div>
    </form>
  );
}
