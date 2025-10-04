// config/db.js


const host = 'localhost';
const database = 'raphietro_atelier';
const user = 'admin';
const password = 'ifsp@1234';
/// TROCAR SENHA E USUARIO DPS

module.exports = () => {
    return dbConn = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
}