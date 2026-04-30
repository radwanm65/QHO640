"use client";
export default function Results({ items }) {
  if (!items.length) return <p>No results</p>;

  return (
    <ul>
      {items.map((song) => (
        <li key={song.id}>
          Name: {song.title} ,Artist: {song.artist}
          ,Year: {song.year}
        </li>
      ))}
    </ul>
  );
}
