import { useState } from "react";
import Login from "./Login";

export default function LoginTest() {
  const [user, setUser] = useState(null);
  const handleLogin = (role, username) => {
    setUser({ role, username });
  };

  return (
    <div className="container py-5">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="card p-4 rounded-4 shadow-lg text-center">
          <h3 className="fw-bold">Welcome, {user.username}!</h3>
          <p className="mt-2">
            You are logged in as: <strong>{user.role.toUpperCase()}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
