import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MetaIcons from "../components/MetaIcons";
import VenueGallery from "../components/VenueGallery";
import useUserStore from "../stores/userStore";

export default function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user } = useUserStore();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_URL;
        const API_KEY = import.meta.env.VITE_API_KEY;

        const res = await fetch(
          `${BASE_URL}/holidaze/venues/${id}?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              "X-Noroff-API-Key": API_KEY,
            },
          }
        );

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

  const handleBooking = async () => {
    if (!user) {
      alert("You must be logged in to book.");
      return;
    }

    setIsBooking(true);

    try {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const token = user.accessToken;
      console.log("Booking venueId:", venue.id);
      console.log("Token being sent:", token);

      const res = await fetch(`${BASE_URL}/holidaze/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dateFrom: startDate,
          dateTo: endDate,
          guests,
          venueId: venue.id,
        }),
      });
      if (!res.ok) throw new Error("Failed to book venue");

      alert("Booking successful!");
      setShowBookingModal(false);
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setIsBooking(false);
    }
  };

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

          {hasValidSelection && (
            <div className="mt-4">
              <button
                className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded"
                onClick={() => setShowBookingModal(true)}
              >
                Book Now
              </button>
            </div>
          )}
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-bold mb-2">Confirm Your Booking</h2>
              <p className="mb-2">
                <strong>Venue:</strong> {venue.name}
              </p>
              <p className="mb-2">
                <strong>From:</strong> {startDate.toDateString()}
              </p>
              <p className="mb-2">
                <strong>To:</strong> {endDate.toDateString()}
              </p>
              <label className="block mb-2">
                <span className="text-sm font-medium">Guests</span>
                <input
                  type="number"
                  value={guests}
                  min={1}
                  max={venue.maxGuests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="border p-2 rounded w-full mt-1"
                />
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded"
                  onClick={handleBooking}
                  disabled={isBooking}
                >
                  {isBooking ? "Booking..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
