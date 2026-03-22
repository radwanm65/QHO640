// SongSearch.js (HitTastic usage example)
import { useState } from "react";
import useAjax from "./useAjax";

export default function SongSearch() {
  const [query, setQuery] = useState("");
  const url = query ? `/api/songs?search=${encodeURIComponent(query)}` : null;

  const [results, setResults, loading, error] = useAjax(url);

  return (
    <div>
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {results.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}
