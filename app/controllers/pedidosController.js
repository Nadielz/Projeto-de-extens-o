const dbConn = require('../../config/db');
const pedidosModel = require('../models/pedidosModel');

module.exports.novoPedidoForm = (app, req, res) => {
    const db = dbConn();
    pedidosModel.getUsuarios(db, (err, usuarios) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).render('novoPedido.ejs', { error: 'Erro ao buscar usuários.', usuarios: [] });
        }
        res.render('novoPedido.ejs', { usuarios });
    });
};

module.exports.criarPedido = (app, req, res) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    const db = dbConn();
    const { costureiro, descricao, valor } = req.body;
    if (!costureiro || !descricao || !valor) {
        return pedidosModel.getUsuarios(db, (err, usuarios) => {
            return res.status(400).render('novoPedido.ejs', { error: 'Preencha todos os campos.', usuarios: usuarios || [] });
        });
    }
    pedidosModel.criarPedido(db, costureiro, descricao, valor, (err, result) => {
        if (err) {
            console.error('Erro ao salvar pedido:', err);
            return pedidosModel.getUsuarios(db, (err2, usuarios) => {
                return res.status(500).render('novoPedido.ejs', { error: 'Erro ao salvar pedido.', usuarios: usuarios || [] });
            });
        }
        return res.redirect('/');
    });
};
