import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";
import AvatarEdit from "../components/profile/AvatarEdit";
import BookingTab from "../components/profile/BookingTab";
import RentalTab from "../components/profile/RentalTab";

export default function Profile() {
  const { user, setUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("vacations");
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [savingAvatar, setSavingAvatar] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.accessToken) return;
    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    };
    fetch(
      `${BASE_URL}/holidaze/profiles/${encodeURIComponent(
        user.name
      )}/bookings?_venue=true`,
      { headers }
    )
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => setBookings(json.data || []))
      .catch((err) => console.error("Failed to load bookings:", err));
  }, [user, BASE_URL, API_KEY]);

  useEffect(() => {
    if (!user?.venueManager || !user.accessToken) return;
    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    };
    fetch(
      `${BASE_URL}/holidaze/profiles/${encodeURIComponent(
        user.name
      )}/venues?_bookings=true`,
      { headers }
    )
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => setRentals(json.data || []))
      .catch((err) => console.error("Failed to load rentals:", err));
  }, [user, BASE_URL, API_KEY]);

  const handleSaveAvatar = async ({ url, alt }) => {
    setSavingAvatar(true);
    try {
      const headers = {
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${BASE_URL}/holidaze/profiles/${encodeURIComponent(user.name)}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({ avatar: { url, alt } }),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setUser({ ...user, avatar: json.data.avatar });
      toast.success("Avatar updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update avatar");
    } finally {
      setSavingAvatar(false);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/holidaze/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setBookings((bs) => bs.filter((b) => b.id !== id));
      toast.success("Booking cancelled");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel booking");
    }
  };

  const handleDeleteVenue = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/holidaze/venues/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setRentals((rs) => rs.filter((v) => v.id !== id));
      toast.success("Venue deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete venue");
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
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* avatar + bio */}
      <div className="md:w-1/3 text-center md:text-left">
        <AvatarEdit
          avatar={user.avatar}
          onSave={handleSaveAvatar}
          isSaving={savingAvatar}
        />
        <h2 className="mt-4 text-heading-4 font-bold">{user.name}</h2>
        <p className="text-body-md text-gray-600">{user.email}</p>
        <p className="mt-2 text-body-sm text-gray-700 whitespace-pre-wrap">
          {user.bio || "No bio available."}
        </p>
      </div>

      {/* tabs + content */}
      <div className="md:w-2/3">
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("vacations")}
            className={`flex-1 py-2 text-center ${
              activeTab === "vacations"
                ? "border-b-2 border-cta font-bold"
                : "text-gray-600 cursor-pointer"
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
                  : "text-gray-600  cursor-pointer"
              }`}
            >
              Your Rentals
            </button>
          )}
        </div>

        {activeTab === "vacations" && (
          <BookingTab bookings={bookings} onCancel={handleCancelBooking} />
        )}

        {activeTab === "rentals" && (
          <RentalTab
            rentals={rentals}
            onEdit={(id) => navigate(`/venue/${id}/edit`)}
            onDelete={handleDeleteVenue}
          />
        )}
      </div>
    </div>
  );
}
