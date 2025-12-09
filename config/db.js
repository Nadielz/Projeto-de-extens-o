const mysql = require('mysql2');

const dbConfig = {
    host: process.env.MYSQLHOST,           
    user: process.env.MYSQLUSER,          
    password: process.env.MYSQLPASSWORD,   
    database: process.env.MYSQLDATABASE,   
    port: Number(process.env.MYSQLPORT)    
};

const conn = () => {
    console.log("Tentando estabelecer conexão com o banco de dados...");
    return mysql.createConnection(dbConfig);
};

module.exports = conn;
