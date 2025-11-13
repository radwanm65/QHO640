import React, { useState, Fragment } from "react";

export default function Login({ onLoginStatusChange, user, admin, darkMode }) {
  const [loginError, setLoginError] = useState("");
  const content = user ? (
    <Fragment>
      Logged in as {user}. {admin ? "(Admin user)" : ""}
      <input type="button" defaultValue="logout" onClick={logout} />
    </Fragment>
  ) : (
    <Fragment>
      <label htmlFor="user">Username:</label>
      <input id="user" type="text" />
      <label htmlFor="pass">Password:</label>
      <input id="pass" type="password" />
      <input type="button" value="login" onClick={login} />
      <strong style={{ backgroundColor: "yellow" }}>{loginError}</strong>
    </Fragment>
  );

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#808080" : "#e0e0e0",
        padding: "4px",
      }}
    >
      {content}
    </div>
  );

  async function login() {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.getElementById("user").value,
        password: document.getElementById("pass").value,
      }),
    });
    const responseObject = await response.json();
    if (response.status == 401) {
      setLoginError(response.error);
      onLoginStatusChange(null, false);
    } else {
      setLoginError("");
      onLoginStatusChange(responseObject.username, responseObject.isadmin);
    }
  }

  async function logout() {
    const response = await fetch("/logout", {
      method: "POST",
    });
    if (response.status == 200) {
      onLoginStatusChange(null, false);
    }
  }
}
