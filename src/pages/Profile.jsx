import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { Pencil } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, setUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("vacations");
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState(user?.avatar?.url || "");
  const [newAvatarAlt, setNewAvatarAlt] = useState(user?.avatar?.alt || "");
  const [savingAvatar, setSavingAvatar] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

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

  // Delete
  const handleDelete = async (venueId) => {
    if (!confirm("Are you sure you want to delete this venue?")) return;
    try {
      const res = await fetch(`${BASE_URL}/holidaze/venues/${venueId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setRentals((rs) => rs.filter((v) => v.id !== venueId));
      toast.success("Venue deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8 h-full">
      {/* Profile info */}
      <div className="flex-shrink-0 w-full md:w-1/3 text-center md:text-left">
        <div className="relative w-40 h-40 mx-auto md:mx-0 mb-4 border rounded-full overflow-hidden">
          <img
            src={user.avatar?.url}
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

        {/* Upcoming */}
        <div className="space-y-4">
          {activeTab === "vacations" && (
            <div className="flex flex-col gap-4">
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

          {/* Rentals */}
          {activeTab === "rentals" && (
            <div className="space-y-4">
              {rentals.length ? (
                rentals.map((venue) => (
                  <div
                    key={venue.id}
                    className="flex justify-between items-center border rounded p-4"
                  >
                    <Link
                      to={`/venue/${venue.id}`}
                      className="font-medium hover:underline"
                    >
                      {venue.name}
                    </Link>

                    <div className="flex gap-4">
                      {/* Edit */}
                      <button
                        onClick={() => navigate(`/venue/${venue.id}/edit`)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(venue.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
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
