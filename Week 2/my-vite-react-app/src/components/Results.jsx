import React from "react";

function Results({ songs, user }) {
  const buySong = async (songId) => {
    await fetch("/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId }),
    });
  };

  return (
    <div>
      <h2>Results</h2>
      {songs.map((song) => (
        <div key={song.id} style={{ marginLeft: "20px", color: "blue" }}>
          <p>
            {song.id} - {song.title} - {song.artist} - {song.year} -{" "}
            {song.downloads} - (£
            {song.price} - {song.quantity}
          </p>
          {user && <button onClick={() => buySong(song.id)}>Buy</button>}
        </div>
      ))}
    </div>
  );
}

export default Results;
