"use client";

import { useState } from "react";

export default function HomePage() {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch() {
    const res = await fetch(`/api/search?artist=${artist}&title=${title}`);
    const data = await res.json();
    setResults(data.results);
  }

  return (
    <main className="ps-3">
      <h1 className="display-4">Artist Search</h1>

      <input
        type="text"
        placeholder="Enter artist name..."
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="border px-3 py-2 w-full mb-4"
      />

      <input
        type="text"
        placeholder="Enter title ..."
        value={title}
        onChange={(e1) => setTitle(e1.target.value)}
        className="border px-3 py-2 w-full mb-4"
      />

      <button onClick={handleSearch} className="btn btn-primary">
        Search
      </button>

      <div className="mt-6">
        {results.length > 0 ? (
          results.map((a) => (
            <div key={a.id} className="border-b py-2">
              Song Id: {a.id} - Artist: {a.name} - From Hometown: {a.hometown} -
              Song Title: {a.title}, {a.year},{a.downloads},{a.price},
              {a.quantity}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results yet.</p>
        )}
      </div>
    </main>
  );
}
