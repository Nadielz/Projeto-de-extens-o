module.exports = {

criarUsuario: (db, nome, senha, email, sexo, telefone, callback) => {
        console.log("Model: criarUsuario");
        const sql = 'INSERT INTO Usuarios (Nome, Senha, Email, Sexo, Telefone) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [nome, senha, email || null, sexo || null, telefone || null], callback);
} 
,

verificarUsuario: (db, identificador, senha, callback) => {
        console.log('Model: verificarUsuario');
        const sql = 'SELECT * FROM Usuarios WHERE (Nome = ? OR Email = ?) AND Senha = ? LIMIT 1';
        db.query(sql, [identificador, identificador, senha], callback);
}

,
getUsuarios: (db, callback) => {
        console.log('Model: getUsuarios (loginModel)');
        const sql = 'SELECT * FROM Usuarios';
        db.query(sql, callback);
},

getUsuarioById: (db, userId, callback) => {
        const sql = 'SELECT * FROM Usuarios WHERE User_ID = ? LIMIT 1';
        db.query(sql, [userId], callback);
},

atualizarUsuario: (db, userId, nome, email, sexo, telefone, callback) => {
        const sql = 'UPDATE Usuarios SET Nome = ?, Email = ?, Sexo = ?, Telefone = ? WHERE User_ID = ?';
        db.query(sql, [nome, email, sexo, telefone, userId], callback);
},

deletarUsuario: (db, userId, callback) => {
        const sql = 'DELETE FROM Usuarios WHERE User_ID = ?';
        db.query(sql, [userId], callback);
}
}