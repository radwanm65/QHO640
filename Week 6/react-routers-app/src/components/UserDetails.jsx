// UserDetails.jsx
import { useLoaderData } from "react-router-dom";

// loader with parameter
export async function userDetailsLoader({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`,
  );
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export default function UserDetails() {
  const user = useLoaderData();

  return (
    <div>
      <h2>User Details</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>City:</strong> {user.address.city}
      </p>
    </div>
  );
}
