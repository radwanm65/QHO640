// --- Simple Home Page -------------------------------------------------------
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Parameters & Loaders Demo</h1>
      <p>Click below to view a user using URL parameters and a loader.</p>
      <div className="space-x-4">
        <Link to="/user/1" className="underline text-blue-600">
          View User 1
        </Link>
        <Link to="/user/2" className="underline text-blue-600">
          View User 2
        </Link>
      </div>
    </div>
  );
}
