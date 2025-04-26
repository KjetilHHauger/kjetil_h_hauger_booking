import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { Pencil } from "@phosphor-icons/react";

export default function Profile() {
  const { user, setUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("vacations");
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [expandedRental, setExpandedRental] = useState(null);
  const [rentalBookingsMap, setRentalBookingsMap] = useState({});
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState(user?.avatar?.url || "");
  const [newAvatarAlt, setNewAvatarAlt] = useState(user?.avatar?.alt || "");
  const [savingAvatar, setSavingAvatar] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const defaultAvatarUrl =
    "https://raw.githubusercontent.com/KjetilHHauger/khh-image-bank/main/Booking/avatars/neutral_avatar.png";

  // Fetch user bookings
  useEffect(() => {
    const authHeaders = user?.accessToken
      ? {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        }
      : {};

    if (user?.accessToken) {
      (async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/holidaze/profiles/${encodeURIComponent(
              user.name
            )}/bookings?_venue=true`,
            { headers: authHeaders }
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          setBookings(json.data || []);
        } catch (err) {
          console.error("Failed to fetch bookings:", err);
        }
      })();
    }
  }, [user, BASE_URL, API_KEY]);

  // Fetch user-managed venues
  useEffect(() => {
    const authHeaders = user?.accessToken
      ? {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        }
      : {};

    if (user?.venueManager && user.accessToken) {
      (async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/holidaze/profiles/${encodeURIComponent(
              user.name
            )}/venues`,
            { headers: authHeaders }
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          setRentals(json.data || []);
        } catch (err) {
          console.error("Failed to fetch rentals:", err);
        }
      })();
    }
  }, [user, BASE_URL, API_KEY]);

  // Toggle rental
  const toggleRental = async (venueId) => {
    const authHeaders = user?.accessToken
      ? {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        }
      : {};

    if (expandedRental === venueId) {
      setExpandedRental(null);
      return;
    }
    setExpandedRental(venueId);

    if (!rentalBookingsMap[venueId]) {
      try {
        const res = await fetch(
          `${BASE_URL}/holidaze/venues/${venueId}?_bookings=true`,
          { headers: authHeaders }
        );
        const json = await res.json();

        setRentalBookingsMap((prev) => ({
          ...prev,
          [venueId]: json.data.bookings || [],
        }));
      } catch (err) {
        console.error("Failed to fetch rental bookings:", err);
      }
    }
  };

  const handleSaveAvatar = async () => {
    const authHeaders = user?.accessToken
      ? {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        }
      : {};

    if (!newAvatarUrl.trim()) return;
    setSavingAvatar(true);
    try {
      const payload = {
        avatar: { url: newAvatarUrl.trim(), alt: newAvatarAlt.trim() },
      };
      const res = await fetch(
        `${BASE_URL}/holidaze/profiles/${encodeURIComponent(user.name)}`,
        {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setUser({ ...user, avatar: json.data.avatar });
      setIsEditingAvatar(false);
    } catch (err) {
      console.error("Failed to update avatar:", err);
    } finally {
      setSavingAvatar(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8 h-full">
      {/* Profile info */}
      <div className="flex-shrink-0 w-full md:w-1/3 text-center md:text-left">
        <div className="relative w-40 h-40 mx-auto md:mx-0 mb-4 border rounded-full overflow-hidden">
          <img
            src={user.avatar?.url || defaultAvatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 15%" }}
          />
          <button
            className="absolute bottom-1 right-16 bg-white p-1 rounded-full"
            onClick={() => setIsEditingAvatar((prev) => !prev)}
            aria-label="Edit avatar"
          >
            <Pencil size={28} weight="bold" />
          </button>
        </div>

        {isEditingAvatar && (
          <div className="mb-4 text-left space-y-2">
            <input
              type="url"
              placeholder="Avatar URL"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Alternate text"
              value={newAvatarAlt}
              onChange={(e) => setNewAvatarAlt(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditingAvatar(false)}
                className="px-4 py-2 border rounded"
                disabled={savingAvatar}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAvatar}
                className="px-4 py-2 bg-cta text-white rounded"
                disabled={savingAvatar}
              >
                {savingAvatar ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
        <h2 className="text-heading-4 font-bold">{user.name}</h2>
        <p className="text-body-md text-gray-600 mb-4">{user.email}</p>
        <div>
          <h3 className="font-semibold mb-2">Information about me</h3>
          <p className="text-body-sm text-gray-700 whitespace-pre-wrap">
            {user.bio || "No bio available."}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-grow w-full md:w-2/3">
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("vacations")}
            className={`flex-1 py-2 text-center ${
              activeTab === "vacations"
                ? "border-b-2 border-cta font-bold"
                : "text-gray-600"
            }`}
          >
            Upcoming Vacations
          </button>

          {user.venueManager && (
            <button
              onClick={() => setActiveTab("rentals")}
              className={`flex-1 py-2 text-center ${
                activeTab === "rentals"
                  ? "border-b-2 border-cta font-bold"
                  : "text-gray-600"
              }`}
            >
              Your Rentals
            </button>
          )}
        </div>

        {/* Information */}
        <div className="space-y-4">
          {activeTab === "vacations" && (
            <div>
              {bookings.length ? (
                bookings.map((booking) => (
                  <Link
                    key={booking.id}
                    to={`/venue/${booking.venue.id}`}
                    className="block p-4 border rounded hover:bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{booking.venue.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-600">No upcoming vacations.</p>
              )}
            </div>
          )}

          {activeTab === "rentals" && (
            <div>
              {rentals.length ? (
                rentals.map((venue) => (
                  <div key={venue.id} className="border rounded">
                    <button
                      onClick={() => toggleRental(venue.id)}
                      className="w-full text-left p-4 flex justify-between items-center"
                    >
                      <span className="font-medium truncate">{venue.name}</span>
                      <span className="text-xl text-gray-500">
                        {expandedRental === venue.id ? "-" : "+"}
                      </span>
                    </button>
                    {expandedRental === venue.id && (
                      <div className="p-4 bg-gray-50 space-y-2">
                        {rentalBookingsMap[venue.id]?.length ? (
                          rentalBookingsMap[venue.id].map((b) => (
                            <div
                              key={b.id}
                              className="flex justify-between text-sm text-gray-700"
                            >
                              <span>
                                {new Date(b.dateFrom).toLocaleDateString()}
                              </span>
                              <span>
                                {new Date(b.dateTo).toLocaleDateString()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600">
                            No bookings for this property.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No rentals to manage.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
