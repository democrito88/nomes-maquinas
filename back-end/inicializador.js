const fs = require('fs');
const db = require('./database/db');

function populateTableIfEmpty(tableName, jsonFilePath) {
  try {
    // Read the JSON file synchronously
    const data = fs.readFileSync(jsonFilePath, 'utf8');

    // Check if the table is already populated
    const rows = db.all(`SELECT COUNT(*) FROM ${tableName}`);
    if (Object.keys(rows).length === 0) {
      // Parse the JSON content
      const jsonData = JSON.parse(data);
      let queryValues = '';

      jsonData.forEach((item) => {
        // Adjust the code based on the structure of your JSON and database schema
        if (tableName === 'secretarias') {
          queryValues += `('${item.nome}', '${item.sigla}'),`;
        } else {
          queryValues += `('${item.nome}', '${item.sigla}', '${item.idSecretaria}'),`;
        }
      });

      console.log(`Populating table '${tableName}'.\n`);

      // Execute the INSERT query
      if (tableName === 'secretarias') {
        db.run(`
          INSERT INTO ${tableName} (nome, sigla) VALUES
          ${queryValues}
          ('', 1);
        `);
      } else {
        db.run(`
          INSERT INTO ${tableName} (nome, sigla, secretaria_id) VALUES
          ${queryValues}
          ('', '', 1);
        `);
      }

      console.log(`Table '${tableName}' populated.\n`);
    } else {
      console.log(`Table '${tableName}' already populated.\n`);
    }
  } catch (error) {
    console.error(`Error populating table '${tableName}':`, error);
  }
}

// Specify the paths to the JSON files
const jsonFileSecretariasPath = './../front-end/public/json/secretarias.json';
const jsonFileSetoresPath = './../front-end/public/json/setores.json';

// Populate 'secretarias' table
populateTableIfEmpty('secretarias', jsonFileSecretariasPath);
populateTableIfEmpty('setores', jsonFileSetoresPath);
// Populate 'setores' table
