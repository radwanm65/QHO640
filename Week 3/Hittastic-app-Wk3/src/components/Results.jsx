import React from "react";

function Results({ songs, user }) {
  const buySong = async (songId) => {
    // console.log("URL", songId);
    const url = "/song/" + songId + "/buy";
    // console.log("URL", url);
    await fetch(url, {
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
          <div>
            {song.id} - {song.title} - {song.artist} - {song.year} -{" "}
            {song.downloads} - (£
            {song.price} - {song.quantity}
            {user && <button onClick={() => buySong(song.id)}>Buy</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Results;
