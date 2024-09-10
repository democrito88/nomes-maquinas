const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); //para conseguir receber requisições POST
const db = require('./database/db'); //conexão com o banco
const fs = require("fs"); //manipulador de arquivos
require('./inicializador');

const localhost = '192.168.11.131';
const port = 3001;

const corsOptions = {
  origin: `*`, // URL do front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', //métodos aceitos
  credentials: true, // Enable credentials (cookies, authorization headers)
  optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
};

app.use(cors(corsOptions), bodyParser.json());

app.get('/dispositivos', (req, res) => {
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
    
    return res.json(rows);
  });
});

app.get('/json/secretarias.json', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'json', 'secretarias.json'), 'utf8');
    const jsonData = JSON.parse(data); // Parse the string to JSON
    return res.json(jsonData); // Send the parsed JSON
  } catch (error) {
    console.error('Error reading the file:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/json/setores.json', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'json', 'setores.json'), 'utf8');
    const jsonData = JSON.parse(data); // Parse the string to JSON
    return res.json(jsonData); // Send the parsed JSON
  } catch (error) {
    console.error('Error reading the file:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Para requisições POSt
app.post(`*`, (req, res) => {
  let formData = req.body;

  db.run(`INSERT INTO computadores ('nome', 'setor_id', 'classe', 'numero', 'mac', 'ip', 'sn', 'teclado_sn', 'mouse_sn', 'monitor_sn', 'status', 'funcionario_id') 
  VALUES('${formData.nome}', '${formData.setor_id}', '${formData.classe}', '${formData.numero}', '${formData.mac}', 
  '${formData.ip}', '${formData.sn}', '${formData.teclado_sn}', '${formData.mouse_sn}', '${formData.monitor_sn}', 0, NULL);`);  

  db.all(`SELECT computadores.*, secretarias.sigla AS nomeSecretaria, setores.sigla AS nomeSetor, funcionarios.nome AS responsavel
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
