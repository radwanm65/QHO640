import React, { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // TODO create another state variable containing the current songs.

  const hardCodedSongs = [
    {
      title: "Woop",
      artist: "Woop",
      year: 1959,
    },
    {
      title: "I Am The Walrus",
      artist: "The Beatles",
      year: 1967,
    },
    {
      title: "All You Need Is Love",
      artist: "The Beatles",
      year: 1967,
    },
    {
      title: "Life on Mars",
      artist: "David Bowie",
      year: 1971,
    },
    {
      title: "Fashion",
      artist: "David Bowie",
      year: 1980,
    },
  ];

  // TODO map the current songs to JSX and show them in the 'results' div.

  const background = darkMode ? "black" : "white",
    foreground = darkMode ? "white" : "black";
  return (
    <div
      style={{
        backgroundColor: background,
        color: foreground,
        padding: "10px",
      }}
    >
      <label htmlFor="artist">Enter an artist:</label>
      <br />
      <input id="artist" />
      <br />
      <input type="button" onClick={search} value="Search!" />
      <br />
      <label htmlFor="mode">Choose mode:</label>
      <br />
      <select id="mode" onChange={updateMode}>
        <option value="light">Light mode</option>
        <option value="dark">Dark mode</option>
      </select>
      <div
        id="results"
        style={{
          margin: "5px",
          width: "100%",
          height: "400px",
          overflow: "auto",
          border: "1px solid " + foreground,
        }}
      ></div>
    </div>
  );

  function search() {
    const artist = document.getElementById("artist").value;
    console.log(artist);
    // Filter the hardcoded songs according to the artist entered.
    // Note how filter() takes an arrow function, returning true or false,
    //  which will run once for each hardcoded song in the array.
    // If the function returns true, i.e. the artist the user entered
    // matches the artist of the current song, that song will pass the
    // filter.
    const filteredSongs = hardCodedSongs.filter(
      // If an arrow function has only one statement, we can omit the
      // curly brackets { } and the "return" keyword.
      (song) => song.artist == artist,
    );

    console.log(`Filtered songs: ${JSON.stringify(filteredSongs)}`);

    // TODO store the filtered songs in state.
  }

  function updateMode() {
    setDarkMode(document.getElementById("mode").value == "dark");
  }
}
