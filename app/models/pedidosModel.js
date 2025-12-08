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
,
    getPedidoById: (db, pedidoId, callback) => {
        const sql = `
            SELECT P.*, U.Nome AS Nome_Costureiro
            FROM Pedidos P
            INNER JOIN Usuarios U ON P.User_ID = U.User_ID
            WHERE P.Pedido_ID = ?
        `;
        db.query(sql, [pedidoId], callback);
    },

    atualizarPedido: (db, pedidoId, userId, descricao, valor, estado, callback) => {
        const sql = `UPDATE Pedidos SET User_ID = ?, Descricao = ?, Valor_Total = ?, Estado = ? WHERE Pedido_ID = ?`;
        db.query(sql, [userId, descricao, valor, estado, pedidoId], callback);
    },

    deletarPedido: (db, pedidoId, callback) => {
        const sql = `DELETE FROM Pedidos WHERE Pedido_ID = ?`;
        db.query(sql, [pedidoId], callback);
    },

    getPedidosConcluidos: (db, callback) => {
        const sql = `
            SELECT P.*, U.Nome AS Nome_Costureiro
            FROM Pedidos P
            INNER JOIN Usuarios U ON P.User_ID = U.User_ID
            WHERE P.Estado = 'Entregue'
        `;
        db.query(sql, callback);
    },

    getClienteById: (db, clienteId, callback) => {
        const sql = 'SELECT * FROM Clientes WHERE Cliente_ID = ? LIMIT 1';
        db.query(sql, [clienteId], callback);
    },

    atualizarCliente: (db, clienteId, nome, endereco, email, sexo, telefone, callback) => {
        const sql = 'UPDATE Clientes SET Nome = ?, Endereco = ?, Email = ?, Sexo = ?, Telefone = ? WHERE Cliente_ID = ?';
        db.query(sql, [nome, endereco, email, sexo, telefone, clienteId], callback);
    },

    deletarCliente: (db, clienteId, callback) => {
        const sql = 'DELETE FROM Clientes WHERE Cliente_ID = ?';
        db.query(sql, [clienteId], callback);
    }
};
