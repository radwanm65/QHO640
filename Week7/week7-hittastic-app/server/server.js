const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/songs", (req, res) => {
  const songs = db.prepare("SELECT * FROM wadsongs").all();
  res.json(songs);
});

app.post("/songs", (req, res) => {
  const { title, artist, year } = req.body;

  if (!title || !artist || !year) {
    return res.json({
      error: "All fields (title, artist, year) are required",
    });
  }

  const result = db
    .prepare("INSERT INTO wadsongs (title, artist, year) VALUES (?, ?, ?)")
    .run(title, artist, year);

  res.json({ id: result.lastInsertRowid });
});

app.get("/search", (req, res) => {
  const artist = req.query.artist;
  const results = db
    .prepare("SELECT * FROM wadsongs WHERE artist LIKE ?")
    .all(`%${artist}%`);

  res.json(results);
});

app.listen(3001, () => console.log("Server running on port 3001"));
