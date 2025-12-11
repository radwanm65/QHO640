// app/api/search/route.js
import db from "../../../db/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("artist")?.toLowerCase() || "";
  const title = searchParams.get("title")?.toLowerCase() || "";

  // Prepare SQL query
  const stmt = db.prepare(`
    SELECT b.id, a.name, b.title, b.year,b.downloads,b.price,b.quantity
FROM artists AS a
JOIN wadsongs AS b ON a.name = b.artist
WHERE lower(a.name) LIKE ?
AND lower(b.title) LIKE ?`);

  const results = stmt.all(`%${query}%`, `%${title}%`);
  //console.log(results);
  return Response.json({ results });
}
