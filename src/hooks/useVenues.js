import { useEffect, useState } from "react";

const API_URL = "https://v2.api.noroff.dev/holidaze/venues";
const API_KEY = "2b4ad557-6e3f-4ba5-94e0-925a8d8ae99a";

export function useVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "X-Noroff-API-Key": API_KEY,
          },
        });

        if (!response.ok)
          throw new Error(
            `Server responded with ${response.status}: ${response.statusText}`
          );
        const { data } = await response.json();
        setVenues(data);
      } catch (err) {
        console.error("Failed to fetch venues:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  return { venues, loading, error };
}
