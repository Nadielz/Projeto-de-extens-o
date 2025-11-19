module.exports = {
  criarPedido: (db, userId, descricao, valor, callback) => {
    const sql = 'INSERT INTO Pedidos (User_ID, Descricao, Valor_Total) VALUES (?, ?, ?)';
    db.query(sql, [userId, descricao, valor], callback);
  },
    getUsuarios: (db, callback) => {
        console.log("Model: getUsuarios");
        const sql = 'SELECT * FROM Usuarios';
        db.query(sql, callback);
    }
};
