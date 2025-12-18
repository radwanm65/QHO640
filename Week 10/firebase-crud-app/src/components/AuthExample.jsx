import React, { useState } from "react";
import {
  register,
  login,
  logout,
  signInWithGoogle,
  auth,
} from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AuthExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Track logged-in user
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      alert("Logged in with Google!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      alert("Registered!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Logged in!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CWA-QHO640-Firebase Auth Example</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div class="container mt-5 d-grid gap-3">
        <button className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
        <button className="btn btn-success" onClick={handleLogin}>
          Login
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
        <h3>{user ? `Logged in as: ${user.email}` : "Not logged in"}</h3>
        <button
          onClick={handleGoogleLogin}
          style={{ background: "#4285F4", color: "white" }}
        >
          Sign in with Google
        </button>
      </div>

      <br />
    </div>
  );
}
