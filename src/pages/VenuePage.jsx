import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MetaIcons from "../components/MetaIcons";
import VenueGallery from "../components/VenueGallery";
import useUserStore from "../stores/userStore";
import Modal from "../components/Modal";
import BookingModal from "../components/BookingModal";
import LoginModal from "../components/LoginModal";
import { Link } from "react-router-dom";

export default function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user } = useUserStore();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
  }, [id, user?.accessToken]);

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
    <div className="max-w-7xl mt-10 mx-auto px-8 sm:px-10 md:px-20">
      <Link to={"/results"}>Back to all listings</Link>

      <h1 className="text-heading-3 font-bold mb-4 text-font-primary truncate">
        {venue.name}
      </h1>

      <VenueGallery media={venue.media} />

      <section className=" flex justify-between md:flex-row flex-col gap-8 mt-8">
        <div>
          <p className="mb-4 break-words line-clamp-6 max-w-xl">
            {venue.description}
          </p>
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
            <div className="flex flex-col items-center">
              <p className="mt-2 text-sm text-brand-primary">
                You have selected
              </p>
              <p className="mt-2 text-sm text-green-700">
                {startDate.toDateString()} to {endDate.toDateString()}
              </p>
            </div>
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
                className="bg-cta hover:bg-cta-hover text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => {
                  if (user) {
                    setShowBookingModal(true);
                  } else {
                    setShowLoginModal(true);
                  }
                }}
              >
                Book Now
              </button>
            </div>
          )}
        </div>
        {/* Booking Modal */}
        {showBookingModal && (
          <Modal onClose={() => setShowBookingModal(false)}>
            <BookingModal
              venue={venue}
              startDate={startDate}
              endDate={endDate}
              onClose={() => setShowBookingModal(false)}
            />
          </Modal>
        )}
        {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)}>
            <div className="p-6 space-y-4">
              <p className="text-state-error text-center">
                You must be logged in to make a booking.
              </p>
              <LoginModal onClose={() => setShowLoginModal(false)} />
            </div>
          </Modal>
        )}
      </section>
    </div>
  );
}
