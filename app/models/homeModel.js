module.exports = {
    getClientes: (db, callback) => {
        console.log("Model: getClientes");
        const sql = 'SELECT * FROM Clientes';
        db.query(sql, callback);
    }
};