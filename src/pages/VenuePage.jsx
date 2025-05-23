import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MetaIcons from "../components/MetaIcons";
import VenueGallery from "../components/VenueGallery";
import useUserStore from "../stores/userStore";
import Modal from "../components/Modal";
import BookingModal from "../components/BookingModal";
import LoginModal from "../components/LoginModal";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export default function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUserStore();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(
    searchParams.get("checkIn") ? new Date(searchParams.get("checkIn")) : null
  );
  const [endDate, setEndDate] = useState(
    searchParams.get("checkOut") ? new Date(searchParams.get("checkOut")) : null
  );
  const initialGuests = parseInt(searchParams.get("guests"), 10) || 1;
  const [guests] = useState(initialGuests);

  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const MAX_CHARS = 300;
  const desc = venue?.description || "";
  const needsTruncate = desc.length > MAX_CHARS;
  const displayDesc =
    !needsTruncate || isDescExpanded ? desc : desc.slice(0, MAX_CHARS) + "...";

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

  const hasValidSelection = startDate && endDate;

  if (loading) return <p>Loading venue...</p>;
  if (!venue) return <p>Venue not found</p>;

  return (
    <div className="max-w-4xl mt-10 mx-auto px-2 md:px-20 flex flex-col justify-center">
      <section className="flex flex-col md:flex-row gap-8 justify-center">
        <section className="max-w-full flex flex-col gap-4">
          <Link
            to={`/results?${searchParams.toString()}`}
            className="hover:text-cta-icon-hover flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={20} /> Back to all listings
          </Link>
          <h1 className="text-heading-3 font-bold mb-4 text-font-primary line-clamp-2">
            {venue.name}
          </h1>
          <VenueGallery media={venue.media} />
          <div>
            <p className="mb-4 break-words max-w-xl">
              {displayDesc}
              {needsTruncate && (
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="ml-2 text-blue-600 hover:underline"
                >
                  {isDescExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </p>
            <p className="mb-2 font-medium">Price: {venue.price} / night</p>
            <p className="mb-2 font-medium">Max guests: {venue.maxGuests}</p>
            <p className="mb-2 font-medium line-clamp-1">
              Location: {venue.location?.address}, {venue.location?.city},{" "}
              {venue.location?.country}
            </p>
            <h2>Facilities</h2>
            <MetaIcons meta={venue.meta} size={32} />
          </div>
        </section>

        <section className="flex flex-col gap-4 items-center md:mt-33">
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [s, e] = dates;
              setStartDate(s === e ? null : s);
              setEndDate(e === s ? null : e);
            }}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            selectsRange
            inline
            excludeDates={bookedDates}
            highlightDates={[
              {
                "react-datepicker__day--highlighted-custom": bookedDates,
              },
            ]}
            calendarClassName="h-72 w-[242px]"
          />
          <h2 className="font-bold">Select dates to book</h2>
          <div className=" flex flex-col items-center gap-2 ">
            {hasValidSelection && (
              <div className="flex flex-col items-center">
                <p className="mt-2 text-sm font-bold text-brand-primary">
                  You have selected
                </p>
                <p className="mt-2 text-sm text-green-700">
                  {startDate.toDateString()}
                </p>
                <p className="text-sm text-green-700">to</p>
                <p className="text-sm text-green-700">
                  {endDate.toDateString()}
                </p>
              </div>
            )}

            {hasValidSelection && (
              <div className="mt-4">
                <button
                  className="bg-cta hover:bg-cta-icon-hover text-white w-30 px-4 py-2 rounded cursor-pointer"
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

            {hasValidSelection && (
              <button
                className="bg-state-info hover:bg-state-info-hover text-white w-30 px-4 py-2 rounded cursor-pointer"
                title="Clear dates"
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
              >
                Clear dates
              </button>
            )}
          </div>
        </section>
      </section>

      <section className=" flex justify-between md:flex-row flex-col gap-8 mt-8">
        {/* Booking Modal */}
        {showBookingModal && (
          <Modal onClose={() => setShowBookingModal(false)}>
            <BookingModal
              venue={venue}
              startDate={startDate}
              endDate={endDate}
              guests={guests}
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
