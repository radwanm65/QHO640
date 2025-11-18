// Search results component - display the search results

import React from "react";

export default function SearchResults({ songsArray, darkMode, user }) {
  const songsJSX = songsArray.map((song) => (
    <li key={song.id}>
      {song.title} by {song.artist}, year {song.year}, price {song.price},
      quantity {song.quantity}
      {user ? <input type="button" defaultValue="Buy Song!" /> : ""}
      {""}
    </li>
  ));

  return (
    <div
      id="results"
      style={{
        margin: "5px",
        width: "100%",
        height: "400px",
        overflow: "auto",
        border: "1px solid " + (darkMode ? "white" : "black"),
      }}
    >
      <ul>{songsJSX}</ul>
    </div>
  );
}
