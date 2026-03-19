const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'nhat_tri_thanh.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    email     TEXT UNIQUE NOT NULL,
    password  TEXT NOT NULL,
    name      TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name_vi     TEXT NOT NULL,
    name_en     TEXT NOT NULL,
    slug        TEXT UNIQUE NOT NULL,
    description_vi TEXT,
    description_en TEXT,
    image       TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name_vi      TEXT NOT NULL,
    name_en      TEXT,
    category_id  INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    description_vi TEXT,
    description_en TEXT,
    model_spec   TEXT,
    image        TEXT,
    specifications TEXT DEFAULT '{}',
    is_active    INTEGER DEFAULT 1,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;
