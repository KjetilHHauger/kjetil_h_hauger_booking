import { useEffect, useState } from "react";

export function useVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isMounted = true;

    const fetchAllVenues = async () => {
      try {
        let page = 1;
        let allVenues = [];
        let isLastPage = false;

        while (!isLastPage) {
          const res = await fetch(`${BASE_URL}?page=${page}&limit=100`);
          const json = await res.json();

          allVenues = [...allVenues, ...json.data];
          isLastPage = json.meta.isLastPage;
          page++;
        }

        if (isMounted) {
          setVenues(allVenues);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAllVenues();

    return () => {
      isMounted = false;
    };
  }, [BASE_URL]);

  return { venues, loading, error };
}
