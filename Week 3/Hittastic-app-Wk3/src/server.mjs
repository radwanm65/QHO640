// Solution to the standard exercises for week 2

// Import dependencies
import express from "express";
import Database from "better-sqlite3";
import betterSqlite3Session from "express-session-better-sqlite3";
import ViteExpress from "vite-express";
import expressSession from "express-session";

// Create our Express server.
const app = express();

// Enable reading JSON from the request body of POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Access static content in the 'public' folder

// app.use(express.static("public"));
// Session Database
const sessDb = new Database("session.db");
const SqliteStore = betterSqlite3Session(expressSession, sessDb);

// Load the database. You may need to change the path.
const db = new Database("wadsongs.db");

app.use(
  expressSession({
    store: new SqliteStore(),
    secret: "BinnieAndClyde",
    resave: true,
    saveUninitialized: false,
    rolling: true,
    unset: "destroy",
    proxy: true,
    cookie: {
      maxAge: 600000,
      httpOnly: false,
    },
  }),
);
app.post("/login", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM ht_users WHERE username=? AND password=?",
    );
    const result = stmt.get(req.body.username, req.body.password);
    console.log("Result", result);
    if (result) {
      req.session.username = req.body.username;
      res.json(result);
    } else {
      res.status(401).json({ error: "Invalid login!" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.use((req, res, next) => {
  if (
    ["POST", "PUT", "DELETE"].indexOf(req.method) != -1 &&
    !req.session.username
  ) {
    res.status(401).json({ error: "Not logged in!" });
  } else {
    next();
  }
});

app.post("/login", (req, res) => {
  res.json({ username: req.session?.username });
});

app.post("/logout", (req, res) => {
  req.session.username = null;
  res.json({ success: 1 });
});

app.get("/artist/:artist.html", (req, res) => {
  const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist=?");
  const results = stmt.all(req.params.artist);
  const songsHTML = results
    .map(
      (song) =>
        `<p style='background-color: blue; color: white'>${song.title} by ${song.artist}, year ${song.quantity} </p>`,
    )
    .join("");
  res.send(songsHTML);
});

// Search by artist
app.get("/artist/:artist", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist=?");
    const results = stmt.all(req.params.artist);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Search by title
app.get("/title/:title", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM wadsongs WHERE title=?");
    const results = stmt.all(req.params.title);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Search by ID
app.get("/song/:id", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM wadsongs WHERE id=?");
    const results = stmt.all(req.params.id);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.get("/songs/all", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM wadsongs");
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Search by title and artist
app.get("/artist/:artist/title/:title", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM wadsongs WHERE title=? AND artist=?",
    );
    const results = stmt.all(req.params.title, req.params.artist);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Buy a song with a given ID
app.post("/song/:id/buy", (req, res) => {
  try {
    const stmt = db.prepare(
      "UPDATE wadsongs SET quantity=quantity-1 WHERE id=?",
    );
    const info = stmt.run(req.params.id);
    if (info.changes == 1) {
      res.json({ success: 1 });
    } else {
      res.status(404).json({ error: "No song with that ID" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete a song with a given ID
app.delete("/song/:id", (req, res) => {
  try {
    const stmt = db.prepare("DELETE FROM wadsongs WHERE id=?");
    const info = stmt.run(req.params.id);
    if (info.changes == 1) {
      res.json({ success: 1 });
    } else {
      res.status(404).json({ error: "No song with that ID" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Add a song
app.post("/song/create", (req, res) => {
  try {
    console.log("/song/create");
    console.log(req.body);
    const stmt = db.prepare(
      "INSERT INTO wadsongs(title,artist,year,downloads,price,quantity) VALUES(?,?,?,0,?,?)",
    );
    const info = stmt.run(
      req.body.title,
      req.body.artist,
      req.body.year,
      req.body.price,
      req.body.quantity,
    );
    console.log(info.lastInsertRowid);
    res.json({ id: info.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Modify a song
app.put("/song/:id", (req, res) => {
  try {
    const stmt = db.prepare(
      "UPDATE wadsongs SET quantity=?,price=? WHERE id=?",
    );
    const info = stmt.run(req.body.quantity, req.body.price, req.params.id);
    res
      .status(info.changes ? 200 : 404)
      .json({ success: info.changes ? true : false });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

ViteExpress.listen(
  app,
  3000,
  () => "Express server with Vite integration now running...",
);
