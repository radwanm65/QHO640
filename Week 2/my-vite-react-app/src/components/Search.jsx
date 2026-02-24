import React, { useState } from "react";

function Search({ onSearch }) {
  const [artist, setArtist] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(artist);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
