import { useState, useEffect } from "react";
import SearchResults from "./searchResults";
import { Link } from "react-router-dom";

export default function SearchByArtist({}) {
  const [searchResults, setSearchResults] = useState([]);
  const [artist, setArtist] = useState("");

  useEffect(() => {
    fetch("/songs/all")
      .then((response) => response.json())
      .then((songsArray) => setSearchResults(songsArray));
  }, []);

  return (
    <div>
      <div style={{ marginTop: "8px", marginBottom: "8px" }}>
        <label htmlFor="artist">Enter an artist:</label>
        <input id="artist" value={artist} onChange={artistUpdated} />
      </div>
      <SearchResults songsArray={searchResults} />
      <Link to={"/"}>
        <button>Go Back Home</button>
      </Link>
    </div>
  );

  async function artistUpdated() {
    const artist = document.getElementById("artist").value;
    if (artist != "") {
      const response = await fetch(`/artist/${artist}`);
      const songs = await response.json();
      setSearchResults(songs);
    }
    setArtist(artist);
  }
}
