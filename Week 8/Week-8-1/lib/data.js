import Database from "better-sqlite3";

// open database (relative to project root)
const db = new Database("wadsongs.db");
export function getArtists(query) {
  if (!query) return [];
  const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist = ?");
  const results = stmt.all(query);

  return results;
}
