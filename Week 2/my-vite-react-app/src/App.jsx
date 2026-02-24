import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Login from "./components/Login";
import AddNewSong from "./components/AddNewSong";
import Logo from "./assets/hittastic.png";

function App() {
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState(null);

  const searchSongs = async (artist) => {
    const response = await fetch(`/artist/${artist}`);
    const data = await response.json();
    setSongs(data);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("songs/all");
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSongs();
  }, []); // runs once after first render

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={Logo} className="logo" alt="Vite logo" />
      </a>
      <h1>HitTastic!</h1>
      <Login user={user} onLogin={handleLogin} />

      <Search onSearch={searchSongs} />

      <Results songs={songs} user={user} />

      {user && user.role === "admin" && <AddNewSong />}
    </div>
  );
}

export default App;
