import Database from "better-sqlite3";

export default async function Page({ params }) {
  const { artist } = await params;

  const db = new Database("wadsongs.db");

  const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist = ?");
  const results = stmt.all(artist);

  return (
    <div>
      <h1>{artist}</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
