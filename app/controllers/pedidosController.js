const dbConn = require('../../config/db');
const pedidosModel = require('../models/pedidosModel');

module.exports.novoPedidoForm = (app, req, res) => {
    const db = dbConn();
    pedidosModel.getUsuarios(db, (err, usuarios) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).render('novoPedido.ejs', { error: 'Erro ao buscar usuários.', usuarios: [], clientes: [] });
        }
        pedidosModel.getClientes(db, (err2, clientes) => {
            if (err2) {
                console.error('Erro ao buscar clientes:', err2);
                clientes = [];
            }
            res.render('novoPedido.ejs', { usuarios, clientes });
        });
    });
};

module.exports.criarPedido = (app, req, res) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    const db = dbConn();
    const { costureiro, cliente, descricao, valor } = req.body;
    if (!costureiro || !cliente || !descricao || !valor) {
        return pedidosModel.getUsuarios(db, (err, usuarios) => {
            return pedidosModel.getClientes(db, (err2, clientes) => {
                return res.status(400).render('novoPedido.ejs', { error: 'Preencha todos os campos.', usuarios: usuarios || [], clientes: clientes || [] });
            });
        });
    }
    pedidosModel.criarPedido(db, costureiro, cliente, descricao, valor, (err, result) => {
        if (err) {
            console.error('Erro ao salvar pedido:', err);
            return pedidosModel.getUsuarios(db, (err2, usuarios) => {
                return pedidosModel.getClientes(db, (err3, clientes) => {
                    return res.status(500).render('novoPedido.ejs', { error: 'Erro ao salvar pedido.', usuarios: usuarios || [], clientes: clientes || [] });
                });
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
        // buscar usuários e clientes para popular selects
        pedidosModel.getUsuarios(db, (err2, usuarios) => {
            if (err2) {
                console.error('Erro ao buscar usuários:', err2);
                usuarios = [];
            }
            pedidosModel.getClientes(db, (err3, clientes) => {
                if (err3) {
                    console.error('Erro ao buscar clientes:', err3);
                    clientes = [];
                }
                res.render('editarPedido.ejs', { pedido, usuarios, clientes });
            });
        });
    });
};

module.exports.atualizarPedido = (app, req, res) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    const pedidoId = req.params.id;
    const db = dbConn();
    const { costureiro, cliente, descricao, valor, estado } = req.body;
    if (!costureiro || !cliente || !descricao || !valor) {
        return pedidosModel.getPedidoById(db, pedidoId, (err, rows) => {
            const pedido = rows && rows[0];
            return pedidosModel.getUsuarios(db, (err2, usuarios) => {
                return pedidosModel.getClientes(db, (err3, clientes) => {
                    return res.status(400).render('editarPedido.ejs', { error: 'Preencha todos os campos.', pedido, usuarios: usuarios || [], clientes: clientes || [] });
                });
            });
        });
    }
    pedidosModel.atualizarPedido(db, pedidoId, costureiro, cliente, descricao, valor, estado || 'Pendente', (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pedido:', err);
            return pedidosModel.getPedidoById(db, pedidoId, (err2, rows) => {
                const pedido = rows && rows[0];
                return pedidosModel.getUsuarios(db, (err3, usuarios) => {
                    return pedidosModel.getClientes(db, (err4, clientes) => {
                        return res.status(500).render('editarPedido.ejs', { error: 'Erro ao atualizar pedido.', pedido, usuarios: usuarios || [], clientes: clientes || [] });
                    });
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
