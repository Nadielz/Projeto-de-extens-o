const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'raphietro_atelier'
};

const conn = () => {
    console.log("Tentando estabelecer conexão com o banco de dados...");
    
    return mysql.createConnection(dbConfig);
};

module.exports = conn;