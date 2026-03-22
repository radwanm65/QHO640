// useAjax.js
import { useState, useEffect } from "react";

export default function useAjax(url) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setResults(Array.isArray(data) ? data : data.results || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted && err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return [results, setResults, loading, error];
}
