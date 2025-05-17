import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapPinLine, CalendarDot, UsersThree } from "@phosphor-icons/react";

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
      className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mx-auto bg-white/92 p-2 rounded "
    >
      <div className="relative flex flex-col md:flex-1">
        <MapPinLine
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
        />

        <input
          aria-label="Search location"
          type="text"
          placeholder="f.eks. Oslo"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full pl-10 placeholder-gray-600"
        />
      </div>

      <div className="relative flex flex-col md:flex-1">
        <CalendarDot
          size={20}
          aria-label="Pick your leave date"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
        />
        <DatePicker
          aria-label="Pick your leave date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          placeholderText="Pick your leave date"
          className="border p-2 rounded w-full pl-10 placeholder-gray-600"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="relative flex flex-col md:flex-1">
        <CalendarDot
          size={20}
          aria-label="Pick your return date"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
        />
        <DatePicker
          aria-label="Pick your return date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Pick your return date"
          className="border p-2 rounded w-full pl-10 placeholder-gray-600"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="relative flex flex-col md:flex-1">
        <UsersThree
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
        />
        <input
          aria-label="How many guests"
          type="number"
          placeholder="How many guests"
          min="1"
          max="100"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="border p-2 rounded w-full pl-10 placeholder-gray-600"
        />
      </div>

      <div className="flex flex-col md:flex-1">
        <button
          type="submit"
          className="bg-cta hover:bg-cta-icon-hover text-white py-2 px-4 rounded w-full cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
}
