import React, { useState, Fragment } from "react";

export default function AddSong() {
  const [addSongError, setAddSongError] = useState("");
  return (
    <div>
      <h2>Add Song</h2>
      <label htmlFor="title">Title:</label>
      <br />
      <input id="title" />
      <br />
      <label htmlFor="artist">Artist:</label>
      <br />
      <input id="artist1" />
      <br />
      <label htmlFor="year">Year:</label>
      <br />
      <input id="year" />
      <br />
      <input
        type="button"
        className="btn btn-primary"
        onClick={songEntered}
        value="Add Song"
      />
      <strong style={{ backgroundColor: "yellow" }}>
        <br />
        {addSongError}
      </strong>
    </div>
  );

  async function songEntered() {
    const response = await fetch("/song/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        artist: document.getElementById("artist1").value,
        year: document.getElementById("year").value,
      }),
    });
    const responseObject = await response.json();
    if (response.status != 200) {
      setAddSongError("Something wrong happened");
    } else {
      setAddSongError("Song Added Successfully");
    }
  }
}
