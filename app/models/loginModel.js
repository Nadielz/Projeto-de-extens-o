module.exports = {

criarUsuario: (db, nome, senha, cargo, email, sexo, telefone, callback) => {
        console.log("Model: criarUsuario");
        const sql = 'INSERT INTO Usuarios (Nome, Senha, Cargo, Email, Sexo, Telefone) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [nome, senha, cargo || null, email || null, sexo || null, telefone || null], callback);
} 
,

verificarUsuario: (db, identificador, senha, callback) => {
        console.log('Model: verificarUsuario');
        // procura pelo Nome OU Email correspondendo à senha
        const sql = 'SELECT * FROM Usuarios WHERE (Nome = ? OR Email = ?) AND Senha = ? LIMIT 1';
        db.query(sql, [identificador, identificador, senha], callback);
}
}