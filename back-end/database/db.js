const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/computadores.sqlite');

// Certify that foreign keys are enabled
db.exec("PRAGMA foreign_keys = ON;");

// Function to create tables synchronously
function createTable(query, tableName) {
  try {
    db.exec(query);
    console.log(`${tableName} table created successfully`);
  } catch (err) {
    console.error(`Error creating ${tableName} table:`, err.message);
  }
}

// Create tables synchronously
createTable(`
  CREATE TABLE IF NOT EXISTS secretarias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sigla TEXT NOT NULL
  );
`, 'Secretarias');

createTable(`
  CREATE TABLE IF NOT EXISTS setores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sigla TEXT NOT NULL,
    secretaria_id INTEGER,
    FOREIGN KEY (secretaria_id) REFERENCES secretarias(id)
  );
`, 'Setores');

createTable(`
  CREATE TABLE IF NOT EXISTS funcionarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    matricula TEXT,
    cargo TEXT,
    funcao TEXT,
    setor_id INTEGER,
    FOREIGN KEY (setor_id) REFERENCES setores(id)
  );
`, 'Funcionarios');

createTable(`
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
    status INTEGER,
    responsavel TEXT,
    linkTermo TEXT,
    setor_id INTEGER,
    funcionario_id INTEGER,
    FOREIGN KEY (setor_id) REFERENCES setores(id),
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id)
    );
    
    `, 'Computadores');
module.exports = db;
