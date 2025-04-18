import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MetaIcons from "../components/MetaIcons";
import VenueGallery from "../components/VenueGallery";

export default function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${BASE_URL}/holidaze/venues/${id}`);
        if (!res.ok) throw new Error("Venue not found");
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

  const bookedDates =
    venue?.bookings?.flatMap((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      const range = [];
      const current = new Date(start);

      while (current <= end) {
        range.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return range;
    }) || [];

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    if (start && end && start.getTime() === end.getTime()) {
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(start);
      setEndDate(end);
    }
  };

  const hasValidSelection = startDate && endDate;

  if (loading) return <p>Loading venue...</p>;
  if (!venue) return <p>Venue not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-heading-3 font-bold mb-4 text-font-primary">
        {venue.name}
      </h1>

      <VenueGallery media={venue.media} />

      <section className=" flex md:flex-row flex-col gap-8 mt-8">
        <div>
          <p className="mb-4">{venue.description}</p>
          <p className="mb-2 font-medium">Price: {venue.price} / night</p>
          <p className="mb-2 font-medium">Max guests: {venue.maxGuests}</p>
          <p className="mb-2 font-medium">
            Location: {venue.location?.address}, {venue.location?.city},{" "}
            {venue.location?.country}
          </p>
          <h2>Facilities</h2>
          <MetaIcons meta={venue.meta} size={32} />
        </div>

        <div className=" flex flex-col items-center gap-2">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            excludeDates={bookedDates}
            highlightDates={[
              {
                "react-datepicker__day--highlighted-custom": bookedDates,
              },
            ]}
          />
          {hasValidSelection && (
            <p className="mt-2 text-sm text-green-700">
              You selected {startDate.toDateString()} to{" "}
              {endDate.toDateString()}
            </p>
          )}
          <button
            className="cursor-pointer"
            title="Clear dates"
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
            }}
          >
            Clear dates
          </button>
        </div>
      </section>
    </div>
  );
}
