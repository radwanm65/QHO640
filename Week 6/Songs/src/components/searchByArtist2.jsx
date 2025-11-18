import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchByArtist2() {
  const [artist, setArtist] = useState("");
  const [results, setResults] = useState([]);

  // Fetch songs each time user types
  useEffect(() => {
    if (artist.trim() === "") {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function fetchSongs() {
      const apiPoint = `/artist/${artist}`;
      try {
        const res = await fetch(apiPoint, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setResults(data || []);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }

    fetchSongs();

    return () => controller.abort();
  }, [artist]);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Search Songs by Artist</h2>
      <label className="block mb-1">Artist Name </label>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Type artist name..."
        className="w-full p-2 border rounded"
      />

      <div className="space-y-2">
        {results.length === 0 && artist.trim() !== "" && (
          <p className="text-gray-600">No songs found.</p>
        )}

        {results.map((song) => (
          <div key={song.id} className="p-3 border rounded">
            <div className="text-sm text-gray-600">
              {song.id}-{song.title} -{song.artist} — {song.year}
            </div>
          </div>
        ))}
      </div>
      <br></br>
      <Link to={"/"}>
        <button>Go Back Home</button>
      </Link>
    </div>
  );
}
