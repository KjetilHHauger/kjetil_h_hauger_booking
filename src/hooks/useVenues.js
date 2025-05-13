import { useState, useEffect } from "react";

export function useVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isMounted = true;

    (async function fetchAll() {
      try {
        let page = 1;
        let all = [];
        let last = false;

        while (!last) {
          const res = await fetch(
            `${BASE_URL}/holidaze/venues?page=${page}&limit=100&_bookings=true`
          );
          if (!res.ok) throw new Error(`Page ${page} failed: ${res.status}`);
          const { data, meta } = await res.json();
          all = all.concat(data);
          last = meta.isLastPage;
          page++;
        }
        if (isMounted) setVenues(all);
      } catch (err) {
        console.error("venue fetch failed:", err);
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [BASE_URL]);

  return { venues, loading, error };
}
