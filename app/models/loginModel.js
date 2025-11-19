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
}