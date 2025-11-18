import React from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";

/**
 * BuySong.jsx
 * A standalone React component that renders a form
 * for adding a song using React Router form actions.
 *
 * Expected action in route:
 *   export async function action({ request }) { ... }
 */
export async function BuySongAction({ request }) {
  const form = await request.formData();
  const songId = form.get("songId")?.trim();
  const errors = {};
  if (!songId) errors.songId = "Song ID is required";

  if (Object.keys(errors).length) {
    return { errors, values: { songId } };
  }
  const apiPoint = `/song/${songId}/buy`;
  console.log("API POINT: ", apiPoint);
  const res = await fetch(apiPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  console.log(res);
  if (res.status === 400) {
    const payload = await res.json();
    return {
      errors: payload.errors || { server: "Invalid input" },
      values: { songId },
    };
  }
  if (res.status != 200) {
    alert("Something wrong happened");
  } else {
    alert("Song Bought Successfully");
  }
}

export default function BuySong() {
  const actionData = useActionData();
  return (
    <div className="max-w-lg p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Song</h2>

      <Form method="post" className="space-y-4">
        <div>
          <label className="block mb-1">Song ID </label>
          <input
            name="songId"
            type="text"
            className="w-full p-2 border rounded"
            defaultValue={actionData?.values?.songId || ""}
          />
          {actionData?.errors?.songId && (
            <p className="text-red-600 text-sm">{actionData.errors.songId}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Buy Song
        </button>
      </Form>
      <Link to={"/"}>
        <button>Go Back Home</button>
      </Link>
    </div>
  );
}
