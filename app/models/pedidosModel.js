module.exports = {
  criarPedido: (db, userId, descricao, valor, callback) => {
    const sql = 'INSERT INTO Pedidos (User_ID, Descricao, Valor_Total) VALUES (?, ?, ?)';
    db.query(sql, [userId, descricao, valor], callback);
  },
    getUsuarios: (db, callback) => {
        console.log("Model: getUsuarios");
        const sql = 'SELECT * FROM Usuarios';
        db.query(sql, callback);
    },
        getClientes: (db, callback) => {
        console.log("Model: getClientes");
        const sql = 'SELECT * FROM Clientes';
        db.query(sql, callback);
    },
getPedidos: (db, callback) => {
    console.log("Model: getPedidos");
    const sql = `
        SELECT
            P.*, -- Seleciona todas as colunas da tabela Pedidos
            U.Nome AS Nome_Costureiro -- Seleciona a coluna Nome da tabela Usuarios e a renomeia
        FROM
            Pedidos P
        INNER JOIN
            Usuarios U ON P.User_ID = U.User_ID
    `;
    db.query(sql, callback);
}
};
