import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BookingModal({
  onClose,
  venue,
  startDate,
  endDate,
  guests: initialGuests,
}) {
  const [guests, setGuests] = useState(initialGuests);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / msPerDay
  );
  const totalPrice = nights * venue.price;
  const navigate = useNavigate();

  const handleBooking = async () => {
    setIsSubmitting(true);
    if (!startDate || !endDate) {
      toast.error("Please select a valid date range.");
      return;
    }

    try {
      setLoading(true);
      const BASE_URL = import.meta.env.VITE_API_URL;
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;
      const API_KEY = import.meta.env.VITE_API_KEY;

      const res = await fetch(`${BASE_URL}/holidaze/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests: guests,
          venueId: venue.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const rawMessage = data.errors?.[0]?.message || "";
        const errorMessage = rawMessage.includes("date")
          ? "Those dates are already booked. Try another range."
          : rawMessage || "Booking failed.";
        throw new Error(errorMessage);
      }

      toast.success("Booking confirmed!");
      onClose();
      navigate("/profile");
    } catch {
      toast.error("Could not make booking");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-brand-primary rounded-lg p-6 max-w-lg w-full">
      <h2 className="text-heading-4 font-bold mb-4">Confirm Booking</h2>

      <p className="mb-2">
        <strong>Venue:</strong> {venue.name}
      </p>
      <p className="mb-2">
        <strong>Dates:</strong> {startDate.toDateString()} -{" "}
        {endDate.toDateString()} (
        <strong>
          {nights} night{nights > 1 ? "s" : ""}
        </strong>
        )
      </p>
      <p className="font-semibold">
        Total: <span className="text-cta">${totalPrice.toFixed(2)}</span>
      </p>

      <label htmlFor="guests" className="block mb-4">
        Guests
        <input
          id="guests"
          name="guests"
          type="number"
          min={1}
          max={venue.maxGuests}
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          className="w-full border rounded p-2"
        />
        <small className="text-xs text-gray-500">Max: {venue.maxGuests}</small>
      </label>

      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleBooking}
          disabled={loading || isSubmitting}
          className="px-4 py-2 rounded bg-cta text-white hover:bg-cta-icon-hover cursor-pointer"
        >
          {loading ? "Booking..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
