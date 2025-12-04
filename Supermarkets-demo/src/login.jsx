import { useState, useEffect } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      setError("Invalid username or password.");
      return;
    }

    setError(null);
    if (onLogin) onLogin(foundUser.role, foundUser.username);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="fw-bold mb-3 text-center">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control rounded-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 fw-semibold rounded-3 py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
