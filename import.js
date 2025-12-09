const fs = require('fs');
const mysql = require('mysql2');

const db = mysql.createPool(process.env.MYSQL_URL);

const sql = fs.readFileSync('./scripts/script.sql', 'utf8');

db.query(sql, (err, results) => {
  if (err) console.error('Erro ao importar banco:', err);
  else console.log('Banco importado com sucesso!');
  process.exit();
});
