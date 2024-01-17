const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/computadores.sqlite');

db.run(`
  CREATE TABLE IF NOT EXISTS secretarias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sigla TEXT NOT NULL
  );
  `);

db.run(`
  CREATE TABLE IF NOT EXISTS setores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sigla TEXT NOT NULL,
    secretaria_id INTEGER,
    FOREIGN KEY (secretaria_id) REFERENCES secretarias(id)
  );
  `);

db.run(`
  CREATE TABLE IF NOT EXISTS computadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    classe TEXT,
    numero INTEGER,
    mac TEXT NOT NULL,
    ip TEXT,
    sn TEXT,
    teclado_sn TEXT,
    mouse_sn TEXT,
    monitor_sn TEXT,
    status INTERGER,
    responsavel TEXT,
    linkTermo TEXT,
    secretaria_id INTEGER,
    setor_id INTEGER,
    FOREIGN KEY (secretaria_id) REFERENCES secretarias(id),
    FOREIGN KEY (setor_id) REFERENCES setores(id)
  );
  `);

module.exports = db; 