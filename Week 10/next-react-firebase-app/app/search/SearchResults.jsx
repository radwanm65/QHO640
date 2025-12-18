import Database from "better-sqlite3";

export default function SearchResults({ artist }) {
  const db = new Database("wadsongs.db");

  const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist=?");
  const results = stmt.all(artist);

  const output = results.map((song) => (
    <li key={song.id}>
      {song.title}, {song.artist},{song.year},{song.downloads},{song.price},
      {song.quantity}
    </li>
  ));
  return (
    <div>
      <ul>{output}</ul>
    </div>
  );
}
