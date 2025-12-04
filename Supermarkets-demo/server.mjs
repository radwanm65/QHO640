import express from "express";
import expressSession from "express-session";
import Database from "better-sqlite3";
import betterSqlite3Session from "express-session-better-sqlite3";
import ViteExpress from "vite-express";

const app = express();
app.use(express.static("public"));
app.use(express.json());

const sessDb = new Database("supermarket.db");

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

const db = new Database("supermarket.db");

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
  console.log("UPDATE Song Number from the Server Side", req.params.id);
  const info = stmt.run(req.params.id);
  res.json({ updated: info.changes });
});

/*
app.use((req, res, next) => {
  if (
    ["POST", "PUT", "DELETE"].indexOf(req.method) != -1 &&
    !req.session.username
  ) {
    res.status(401).json({ error: "Not logged in!" });
    console.log("User is not logged in, Please Log in");
  } else {
    next();
  }
});
*/
app.get("/products", (req, res) => {
  const stmt = db.prepare(` SELECT * FROM products`);
  const rows = stmt.all();
  res.json(rows);
});

app.get("/supermarkets", (req, res) => {
  const stmt = db.prepare(` SELECT * FROM supermarkets`);
  const rows = stmt.all();
  const supermarkets = rows.map((item) => item.name);
  res.json(supermarkets);
});

app.get("/categories", (req, res) => {
  const stmt = db.prepare(` SELECT * FROM categories`);
  const rows = stmt.all();
  const categories = rows.map((item) => item.name);
  res.json(categories);
});

app.get("/locations", (req, res) => {
  const stmt = db.prepare(` SELECT * FROM locations`);
  const rows = stmt.all();
  res.json(locations);
});

app.get("/users", (req, res) => {
  const stmt = db.prepare(` SELECT * FROM users`);
  const rows = stmt.all();
  res.json(rows);
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
