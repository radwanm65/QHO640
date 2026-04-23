import React, { useEffect, useState } from "react";

function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <div>
      <h2>All Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist} ({song.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
