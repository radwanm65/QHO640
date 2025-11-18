import { React, useState } from "react";

import { Form, Link, redirect, useActionData } from "react-router-dom";

/**
 * AddSong.jsx
 * A standalone React component that renders a form
 * for adding a song using React Router form actions.
 *
 * Expected action in route:
 *   export async function action({ request }) { ... }
 */
export async function action({ request }) {
  const form = await request.formData();
  const title = form.get("title")?.trim();
  const artist = form.get("artist")?.trim();
  const year = form.get("year")?.trim() || "";

  const errors = {};
  if (!title) errors.title = "Title is required";
  if (!artist) errors.artist = "Artist is required";
  if (!year) errors.year = "Year is required";

  if (Object.keys(errors).length) {
    return { errors, values: { title, artist, year } };
  }

  const res = await fetch(`/song/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ title, artist, year }),
  });

  if (res.status === 400) {
    const payload = await res.json();
    return {
      errors: payload.errors || { server: "Invalid input" },
      values: { title, artist, year },
    };
  }

  if (res.status != 200) {
    alert("Something wrong happened");
  } else {
    alert("Song Added Successfully");
  }
}

export default function AddSong() {
  const actionData = useActionData();
  return (
    <div className="max-w-lg p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Song</h2>

      <Form method="post" className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            type="text"
            className="w-full p-2 border rounded"
            defaultValue={actionData?.values?.title || ""}
          />
          {actionData?.errors?.title && (
            <p className="text-red-600 text-sm">{actionData.errors.title}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Artist</label>
          <input
            name="artist"
            defaultValue={actionData?.values?.artist || ""}
            type="text"
            className="w-full p-2 border rounded"
          />
          {actionData?.errors?.title && (
            <p className="text-red-600 text-sm">{actionData.errors.artist}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Year</label>
          <input
            name="year"
            defaultValue={actionData?.values?.year || ""}
            type="text"
            className="w-full p-2 border rounded"
          />
          {actionData?.errors?.title && (
            <p className="text-red-600 text-sm">{actionData.errors.year}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Song
        </button>
      </Form>
      <Link to={"/"}>
        <button>Go Back Home</button>
      </Link>
    </div>
  );
}
