const dbConn = require('../../config/db');
const loginModel = require('../models/loginModel');
module.exports.login = (app, req, res) => {
    console.log('Controller do login');
    res.render('login.ejs');
};

module.exports.cadastrar = (app, req, res) => {
    console.log('Controller: cadastrar');
    const db = dbConn();

    const nome = req.body.nome || req.body.usuario || req.body.email;
    const senha = req.body.senha;
    const email = req.body.email || null;
    const sexo = req.body.sexo || null;
    const telefone = req.body.telefone || null;
    const cargo = req.body.cargo || null;

    if (!nome || !senha) {
        return res.status(400).send('Nome (ou email) e senha são obrigatórios');
    }

        let sexoNormalized = null;
    if (sexo) {
      const s = sexo.toLowerCase();
      if (s === 'm' || s === 'masculino') sexoNormalized = 'Masculino';
      if (s === 'f' || s === 'feminino') sexoNormalized = 'Feminino';
      if (s === 'o' || s === 'outro') sexoNormalized = 'Outro';
    }

    loginModel.criarUsuario(db, nome, senha, cargo, email, sexoNormalized, telefone, (error, result) => {
        if (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).send('Erro ao criar usuário');
        }

        console.log('Usuário criado com sucesso:', result);
        return res.redirect('/login');
    });
};

module.exports.autenticar = (app, req, res) => {
    console.log('Controller: autenticar');
    const db = dbConn();

    const identificador = req.body.usuario || req.body.email || req.body.nome;
    const senha = req.body.senha;

    if (!identificador || !senha) {
        return res.status(400).send('Usuário e senha são obrigatórios');
    }

    loginModel.verificarUsuario(db, identificador, senha, (err, rows) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err);
            return res.status(500).send('Erro no servidor');
        }

        if (!rows || rows.length === 0) {
            return res.status(401).send('Usuário ou senha inválidos');
        }

        console.log('Usuário autenticado:', rows[0].Nome);
        req.session.user = { id: rows[0].User_ID, nome: rows[0].Nome };
    return res.redirect('/adm');
    });
};