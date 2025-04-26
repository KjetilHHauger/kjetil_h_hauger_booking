import { useState, useEffect } from "react";
import useUserStore from "../stores/userStore";

export default function Profile() {
  const { user } = useUserStore();
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const authHeaders = user?.accessToken
    ? {
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      }
    : {};

  // Fetch user bookings
  useEffect(() => {
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
  }, [user, BASE_URL]);

  // Fetch user-managed venues
  useEffect(() => {
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
  }, [user, BASE_URL]);

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0 w-full md:w-1/3 text-center md:text-left">
        <div className="w-32 h-32 mx-auto md:mx-0 mb-4 border rounded overflow-hidden">
          <img
            src={user.avatar?.url || "/brokenImage.png"}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-heading-4 font-bold">{user.name}</h2>
        <p className="text-body-md text-gray-600 mb-4">{user.email}</p>
        <div>
          <h3 className="font-semibold mb-2">Information about me</h3>
          <p className="text-body-sm text-gray-700 whitespace-pre-wrap">
            {user.bio || "No bio available."}
          </p>
        </div>
      </div>

      <div className="flex-grow w-full md:w-2/3">
        <p>Tabs and content will go here.</p>
      </div>
    </div>
  );
}
