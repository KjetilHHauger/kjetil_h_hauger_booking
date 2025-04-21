import { useState } from "react";
import { toast } from "react-toastify";

export default function BookingModal({ onClose, venue, startDate, endDate }) {
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
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
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-heading-4 font-bold mb-4">Confirm Booking</h2>

      <p className="mb-2">
        <strong>Venue:</strong> {venue.name}
      </p>
      <p className="mb-2">
        <strong>Dates:</strong> {startDate.toDateString()} -{" "}
        {endDate.toDateString()}
      </p>

      <label className="block mb-4">
        <span className="block mb-1 font-medium">Guests</span>
        <input
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
          disabled={loading}
          className="px-4 py-2 rounded bg-cta text-white hover:bg-cta-hover cursor-pointer"
        >
          {loading ? "Booking..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
