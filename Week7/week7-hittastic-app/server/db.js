const Database = require("better-sqlite3");

const db = new Database("wadsongs.db");

module.exports = db;
