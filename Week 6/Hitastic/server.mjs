import express from "express";
import expressSession from "express-session";
import Database from "better-sqlite3";
import betterSqlite3Session from "express-session-better-sqlite3";
import ViteExpress from "vite-express";

const app = express();
app.use(express.static("public"));
app.use(express.json());

const sessDb = new Database("session.db");

const SqliteStore = betterSqlite3Session(expressSession, sessDb);

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
  })
);

const PORT = 3000;

const db = new Database("wadsongs.db");

app.post("/login", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM ht_users WHERE username=? AND password=?"
    );
    const result = stmt.get(req.body.username, req.body.password);
    if (result) {
      req.session.username = req.body.username;
      const admin = result.isadmin ? true : false;
      req.session.isadmin = admin;
      res.json({ username: req.body.username, isadmin: admin });
    } else {
      res.status(401).json({ error: "Invalid login!" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.get("/login", (req, res) => {
  res.json({
    username: req.session?.username,
    isadmin: req.session?.isadmin || false,
  });
});

app.post("/logout", (req, res) => {
  req.session.username = null;
  res.json({ success: 1 });
});

app.post("/song/:id/buy", (req, res) => {
  const stmt = db.prepare("UPDATE wadsongs SET quantity=quantity-1 WHERE id=?");
  const info = stmt.run(req.params.id);
  console.log(req.params.id);
  res.json({ updated: info.changes });
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

app.get("/artist/:artist", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist LIKE ?");
    const results = stmt.all(`%${req.params.artist}%`);
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.get("/year/:year", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM wadsongs WHERE year=?");
    const results = stmt.all(req.params.year);
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.get("/songs/all", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM wadsongs");
    const results = stmt.all();
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.put("/song/:id", (req, res) => {
  try {
    if (!req.body.title || !req.body.artist || !req.body.year) {
      res.status(400).json({ error: "Missing data" });
    } else {
      const stmt = db.prepare(
        "UPDATE wadsongs SET title=?,artist=?,year=? WHERE id=?"
      );
      const info = stmt.run(
        req.body.title,
        req.body.artist,
        req.body.year,
        req.body.id
      );
      res.json({ updated: info.changes });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.post("/song/new", (req, res) => {
  try {
    console.log("Title", req.body.title);
    console.log("Artist", req.body.artist);
    console.log("Year", req.body.year);
    if (!req.body.title || !req.body.artist || !req.body.year) {
      res.status(400).json({ error: "Missing data" });
    } else {
      const stmt = db.prepare(
        "INSERT INTO wadsongs(title,artist,year) VALUES (?,?,?)"
      );
      const info = stmt.run(req.body.title, req.body.artist, req.body.year);
      res.json({ id: info.lastInsertRowid });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
