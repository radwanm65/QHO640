import React, { useState, useEffect } from "react";
import Search from "./search.jsx";
import Login from "./login.jsx";
import AddSong from "./addsong.jsx";
import ModeChooser from "./modechooser.jsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const background = darkMode ? "black" : "white",
    foreground = darkMode ? "white" : "black";
  return (
    <div
      style={{
        backgroundColor: background,
        color: foreground,
        padding: "10px",
        border: admin ? "5px solid red" : "",
      }}
    >
      <Login
        onLoginStatusChange={handleLoginStatusChange}
        user={user}
        admin={admin}
        darkMode={darkMode}
      />
      <Search darkMode={darkMode} user={user} />
      <br />
      <ModeChooser darkMode={darkMode} modeUpdated={changeMode} />
      {admin ? <AddSong /> : ""}
    </div>
  );

  function handleLoginStatusChange(user, admin) {
    setUser(user);
    setAdmin(admin);
  }

  function changeMode(mode) {
    setDarkMode(mode == "dark");
  }
}
