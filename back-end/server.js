const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); //para conseguir receber requisições POST
const db = require('./database/db'); //conexão com o banco
require('./inicializador');

const localhost = '192.168.11.131';
const portaFrontEnd = 3000;
const port = 3001;

const corsOptions = {
  origin: `*`, // URL do front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', //métodos aceitos
  credentials: true, // Enable credentials (cookies, authorization headers)
  optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
};

app.use(cors(corsOptions), bodyParser.json());

// Para requisições GET
app.get('*', (req, res) => {
  //LEFT JOIN funcionarios ON funcionarios.id = computadores.funcionario_id
  db.all(`SELECT computadores.*, secretarias.sigla AS nomeSecretaria, setores.sigla AS nomeSetor, funcionarios.nome AS responsavel
  FROM computadores
  JOIN setores ON setores.id = computadores.setor_id
  JOIN secretarias ON secretarias.id = setores.secretaria_id
  LEFT JOIN funcionarios ON funcionarios.id = computadores.funcionario_id
  ORDER BY computadores.id ASC`, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});

// Para requisições POSt
app.post(`*`, (req, res) => {
  let formData = req.body;
  console.log(req.body);

  db.run(`INSERT INTO computadores ('nome', 'setor_id', 'classe', 'numero', 'mac', 'ip', 'sn', 'teclado_sn', 'mouse_sn', 'monitor_sn', 'status') 
  VALUES('${formData.nome}', '${formData.setor_id}', '${formData.classe}', '${formData.numero}', '${formData.mac}', 
  '${formData.ip}', '${formData.sn}', '${formData.teclado_sn}', '${formData.mouse_sn}', '${formData.monitor_sn}', 0);`);  

  db.all(`SELECT computadores.id, computadores.nome, secretarias.sigla AS nomeSecretaria, setores.sigla AS nomeSetor, computadores.classe, computadores.numero, funcionarios.nome AS responsavel
  FROM computadores
  JOIN setores ON setores.id = computadores.setor_id
  JOIN secretarias ON secretarias.id = setores.secretaria_id
  LEFT JOIN funcionarios ON funcionarios.id = computadores.funcionario_id
  ORDER BY computadores.id DESC LIMIT 1`, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  }); 
});

app.listen(port, () => {
  console.log(`Server is running on http://${localhost}:${port}`);
});
