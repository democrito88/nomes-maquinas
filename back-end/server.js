const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); //para conseguir receber requisições POST
const db = require('./database/db'); //conexão com o banco

const localhost = 'localhost';
const portaFrontEnd = 3000;
const port = 3001;

const corsOptions = {
  origin: `http://${localhost}:${portaFrontEnd}`, // URL do front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', //métodos aceitos
  credentials: true, // Enable credentials (cookies, authorization headers)
  optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
};

app.use(cors(corsOptions), bodyParser.json());

//Alimentar a database
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
// Fim de alimentação de database


// Para requisições GET
app.get('*', (req, res) => {
  res.json({computador: {nome: req.query}});
});

// Para requisições POSt
app.post(`*`, (req, res) => {
  db.all(`SELECT computadores.nome, secretarias.nome, setores.nome, computadores.classe, computadores.numero 
  FROM computadores
  JOIN secretarias ON secretarias.id = computadores.secretarias_id,
  JOIN setores ON setores.id = computadores.setores_id`, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });

  db.close();
});

app.listen(port, () => {
  console.log(`Server is running on http://${localhost}:${port}`);
});
