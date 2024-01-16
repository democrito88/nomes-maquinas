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
    secretaria_id INTEGER,
    setor_id INTEGER,
    FOREIGN KEY (secretaria_id) REFERENCES secretarias(id),
    FOREIGN KEY (setor_id) REFERENCES setores(id)
  );
  `);

db.run(` 
  INSERT INTO secretarias (nome, sigla) VALUES
    ('Secretaria da Fazenda', 'SEFAZ');
    `);

db.run(`
  INSERT INTO setores (nome, sigla, secretaria_id) VALUES
    ('Gabinete', 'Gabinete', 1);
`);
 
db.run(`
  INSERT INTO computadores (nome, classe, numero, mac, ip, sn, teclado_sn, mouse_sn, secretaria_id, setor_id) VALUES
    ('S1S1PC1N1', 'PC', 1, '1a2b3c4d', '192.168.10.1', '?????????', '????', '?????', 1, 1);
`);

module.exports = db; 