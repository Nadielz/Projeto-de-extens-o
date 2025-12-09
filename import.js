const fs = require('fs');
const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'crossover.proxy.rlwy.net',
  user: 'root',
  password: 'rjsEdPfyBOxQShDLWepsENaQnQeQaJeo',
  database: 'railway',
  port: 46028,
  multipleStatements: true
});

const sql = fs.readFileSync('./scripts/script.sql', 'utf8');

db.query(sql, (err, results) => {
  if (err) console.error('Erro ao importar banco:', err);
  else console.log('Banco importado com sucesso!');
  process.exit();
});
