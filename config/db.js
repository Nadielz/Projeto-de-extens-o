const mysql = require('mysql2');

const db = mysql.createPool(process.env.MYSQL_URL); 

db.getConnection((err, conn) => {
  if (err) console.error("Erro ao conectar no MySQL:", err);
  else {
    console.log("Conexão com MySQL estabelecida com sucesso!");
    conn.release();
  }
});

module.exports = db;
