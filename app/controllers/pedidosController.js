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
        return res.redirect('/pedidos');
    });
};
module.exports.getPedidos = (app, req, res) => {
    console.log('Controller da home executado');
    
    const db = dbConn();

    pedidosModel.getPedidos(db, (error, result) => {
        
        if (error) {
            console.log("Erro ao buscar pedidos:", error);
            res.send("Ocorreu um erro ao consultar os dados.");
            return;
        }
        console.log("Pedidos encontrados:", result);
        res.render('pedidos.ejs', { pedidos: result });
    });
}

module.exports.editarPedidoForm = (app, req, res) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    const pedidoId = req.params.id;
    const db = dbConn();
    pedidosModel.getPedidoById(db, pedidoId, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            return res.status(500).send('Erro ao buscar pedido');
        }
        if (!rows || rows.length === 0) {
            return res.status(404).send('Pedido não encontrado');
        }
        const pedido = rows[0];
        // buscar usuários para popular select
        pedidosModel.getUsuarios(db, (err2, usuarios) => {
            if (err2) {
                console.error('Erro ao buscar usuários:', err2);
                usuarios = [];
            }
            res.render('editarPedido.ejs', { pedido, usuarios });
        });
    });
};

module.exports.atualizarPedido = (app, req, res) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    const pedidoId = req.params.id;
    const db = dbConn();
    const { costureiro, descricao, valor, estado } = req.body;
    if (!costureiro || !descricao || !valor) {
        return pedidosModel.getPedidoById(db, pedidoId, (err, rows) => {
            const pedido = rows && rows[0];
            return pedidosModel.getUsuarios(db, (err2, usuarios) => {
                return res.status(400).render('editarPedido.ejs', { error: 'Preencha todos os campos.', pedido, usuarios: usuarios || [] });
            });
        });
    }
    pedidosModel.atualizarPedido(db, pedidoId, costureiro, descricao, valor, estado || 'Pendente', (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pedido:', err);
            return pedidosModel.getPedidoById(db, pedidoId, (err2, rows) => {
                const pedido = rows && rows[0];
                return pedidosModel.getUsuarios(db, (err3, usuarios) => {
                    return res.status(500).render('editarPedido.ejs', { error: 'Erro ao atualizar pedido.', pedido, usuarios: usuarios || [] });
                });
            });
        }
        return res.redirect('/pedidos');
    });
};

module.exports.deletarPedido = (app, req, res) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    const pedidoId = req.params.id;
    const db = dbConn();
    pedidosModel.deletarPedido(db, pedidoId, (err, result) => {
        if (err) {
            console.error('Erro ao deletar pedido:', err);
            return res.status(500).send('Erro ao deletar pedido');
        }
        return res.redirect('/pedidos');
    });
};
