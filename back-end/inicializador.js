const fs = require('fs');
const db = require('./database/db'); //conexão com o banco

// Specify the path to the JSON file
const jsonFileSecretariasPath = './../front-end/public/json/secretarias.json';
const jsonFileSetoresPath = './../front-end/public/json/setores.json';

// Read the JSON file
fs.readFile(jsonFileSecretariasPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        // Parse the JSON content
        const jsonData = JSON.parse(data);
        let dadosDaQuery = "";

        jsonData.forEach(secretaria => dadosDaQuery += `('${secretaria.nome}', '${secretaria.sigla}'),`);

        // Access and work with the JSON data
        db.run(` 
            INSERT INTO secretarias (nome, sigla) VALUES
            ${dadosDaQuery}
            ('', '');
        `);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});


fs.readFile(jsonFileSetoresPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        // Parse the JSON content
        const jsonData2 = JSON.parse(data);
        let dadosDaQuery = "";
        
        jsonData2.forEach(setor => dadosDaQuery += `('${setor.nome}', '${setor.sigla}', '${setor.idSecretaria}'),`);
        console.log("\n");
        // Access and work with the JSON data
        db.run(` 
            INSERT INTO setores (nome, sigla, secretaria_id) VALUES
            ${dadosDaQuery}
            ('', '', 1);
        `);
        console.log("\n");
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});