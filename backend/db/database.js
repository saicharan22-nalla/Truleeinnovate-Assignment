const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFolderPath = path.join(__dirname); // backend/db/
const dbFilePath = path.join(dbFolderPath, 'candidates.db');

// Ensure the folder exists
if (!fs.existsSync(dbFolderPath)) {
  fs.mkdirSync(dbFolderPath, { recursive: true });
}

const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error('Failed to open DB:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    gender TEXT,
    experience INTEGER,
    qualification TEXT,
    skills TEXT
  )`);
});

module.exports = db;
