import React, { useState } from "react";

function SearchForm() {
  const [artist, setArtist] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`http://localhost:3001/search?artist=${artist}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <h2>Search</h2>

      <input
        placeholder="Enter artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <p>You entered the artist: {artist}</p>

      <button onClick={handleSearch}>Search</button>

      <h3>Results</h3>
      {results.map((song) => (
        <p key={song.id}>
          {song.title} - {song.artist} ({song.year})
        </p>
      ))}
    </div>
  );
}

export default SearchForm;
