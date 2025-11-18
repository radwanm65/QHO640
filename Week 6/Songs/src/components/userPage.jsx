import { useLoaderData, useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

// --- Loader Example ---------------------------------------------------------
// A loader can fetch data before rendering the component.
export async function userLoader({ params }) {
  // simulated fetch
  return {
    id: params.userId,
    name: "User " + params.userId,
    role: "Admin",
  };
}

export function UserPage() {
  // Access data returned from the loader
  const user = useLoaderData();
  const { userId } = useParams();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Page</h1>

      <div className="rounded-2xl shadow p-4 border">
        <p>User ID from URL parameter: {userId}</p>
        <p>Name from loader: {user.name}</p>
        <p>Role from loader: {user.role}</p>
      </div>

      <Link to="/" className="underline text-blue-600">
        Back Home
      </Link>
    </div>
  );
}
