// lib/db.js
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

let db;

try {
  // Ensure /db directory exists
  const dbDir = path.join(process.cwd(), "db");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
  }

  // Path to the SQLite file
  const dbPath = path.join(dbDir, "wadsongs.db");

  // Attempt to open or create the DB
  db = new Database(dbPath, { verbose: console.log });
} catch (err) {
  console.error("❌ Failed to initialize SQLite database:", err.message);
  throw new Error("Database initialization failed.");
}

//
// Create tables (wrapped in safe try/catch)
//
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS artists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      genre TEXT
    );
  `);
} catch (err) {
  console.error("❌ Failed to create tables:", err.message);
  throw new Error("Database table creation failed.");
}

//
// Optional: Validate DB health
//
try {
  db.prepare("SELECT 1").get();
  console.log("✅ SQLite database is ready.");
} catch (err) {
  console.error("❌ SQLite health check failed:", err.message);
  throw new Error("Database health check failed.");
}

export default db;
