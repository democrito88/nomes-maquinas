const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); //para conseguir receber requisições POST
const db = require('./database/db'); //conexão com o banco
require('./inicializador');

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


// Para requisições GET
app.get('*', (req, res) => {
  res.json({computador: {nome: req.query}});
});

// Para requisições POSt
app.post(`*`, (req, res) => {
  console.log(req.body);
  let formData = req.body;

  db.run(`INSERT INTO computadores ('nome', 'secretaria_id', 'setor_id', 'classe', 'numero', 'mac', 'ip', 'sn', 'teclado_sn', 'mouse_sn') 
  VALUES('${formData.nome}', '${formData.secretaria_id}', '${formData.setor_id}', '${formData.classe}', '${formData.numero}', '${formData.mac}', 
  '${formData.ip}', '${formData.sn}', '${formData.teclado_sn}', '${formData.mouse_sn}')`);

  db.all(`SELECT computadores.nome, secretarias.nome AS nomeSecretaria, setores.nome AS nomeSetor, computadores.classe, computadores.numero 
  FROM computadores
  JOIN secretarias ON secretarias.id = computadores.secretaria_id
  JOIN setores ON setores.id = computadores.setor_id`, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://${localhost}:${port}`);
});
