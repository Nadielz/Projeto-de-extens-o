const dbConn = require('../../config/db');
const pedidosModel = require('../models/pedidosModel');
const loginModel = require('../models/loginModel');

module.exports.adm = (app, req, res) => {
    console.log('Controller da tela de adm');
    const db = dbConn();
    
    // Buscar usuários, clientes e pedidos concluídos em paralelo
    let usuarios, clientes, pedidos;
    let errCount = 0;
    
    loginModel.getUsuarios(db, (err, u) => {
        if (err) errCount++;
        usuarios = u || [];
        checkComplete();
    });
    
    pedidosModel.getClientes(db, (err, c) => {
        if (err) errCount++;
        clientes = c || [];
        checkComplete();
    });
    
    pedidosModel.getPedidosConcluidos(db, (err, p) => {
        if (err) errCount++;
        pedidos = p || [];
        checkComplete();
    });
    
    function checkComplete() {
        if (usuarios !== undefined && clientes !== undefined && pedidos !== undefined) {
            if (errCount > 0) {
                console.warn('Alguns erros ao buscar dados, continuando...');
            }
            res.render('adm.ejs', { usuarios, clientes, pedidos });
        }
    }
};

module.exports.editarUsuarioForm = (app, req, res) => {
    const userId = req.params.id;
    const db = dbConn();
    loginModel.getUsuarioById(db, userId, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).send('Erro');
        }
        if (!rows || rows.length === 0) return res.status(404).send('Usuário não encontrado');
        const usuario = rows[0];
        res.render('editarUsuario.ejs', { usuario });
    });
};

module.exports.atualizarUsuario = (app, req, res) => {
    const userId = req.params.id;
    const { nome, email, sexo, telefone } = req.body;
    const db = dbConn();
    if (!nome) return res.status(400).send('Nome é obrigatório');
    loginModel.atualizarUsuario(db, userId, nome, email, sexo, telefone, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            return res.status(500).send('Erro ao atualizar');
        }
        res.redirect('/adm');
    });
};

module.exports.deletarUsuario = (app, req, res) => {
    const userId = req.params.id;
    const db = dbConn();
    loginModel.deletarUsuario(db, userId, (err, result) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err);
            return res.status(500).send('Erro ao deletar');
        }
        res.redirect('/adm');
    });
};

module.exports.listarClientes = (app, req, res) => {
    const db = dbConn();
    pedidosModel.getClientes(db, (err, clientes) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            return res.status(500).send('Erro ao buscar clientes');
        }
        res.render('clientes.ejs', { clientes });
    });
};

module.exports.editarClienteForm = (app, req, res) => {
    const clienteId = req.params.id;
    const db = dbConn();
    pedidosModel.getClienteById(db, clienteId, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            return res.status(500).send('Erro');
        }
        if (!rows || rows.length === 0) return res.status(404).send('Cliente não encontrado');
        const cliente = rows[0];
        res.render('editarCliente.ejs', { cliente });
    });
};

module.exports.atualizarCliente = (app, req, res) => {
    const clienteId = req.params.id;
    const { nome, endereco, email, sexo, telefone } = req.body;
    const db = dbConn();
    if (!nome || !email) return res.status(400).send('Nome e email são obrigatórios');
    pedidosModel.atualizarCliente(db, clienteId, nome, endereco, email, sexo, telefone, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar cliente:', err);
            return res.status(500).send('Erro ao atualizar');
        }
        res.redirect('/adm');
    });
};

module.exports.deletarCliente = (app, req, res) => {
    const clienteId = req.params.id;
    const db = dbConn();
    pedidosModel.deletarCliente(db, clienteId, (err, result) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            return res.status(500).send('Erro ao deletar');
        }
        res.redirect('/adm');
    });
};

module.exports.listarPedidosConcluidos = (app, req, res) => {
    const db = dbConn();
    pedidosModel.getPedidosConcluidos(db, (err, pedidos) => {
        if (err) {
            console.error('Erro ao buscar pedidos concluídos:', err);
            return res.status(500).send('Erro ao buscar pedidos');
        }
        res.render('pedidosConcluidos.ejs', { pedidos });
    });
};

module.exports.deletarPedidoAdm = (app, req, res) => {
    const pedidoId = req.params.id;
    const db = dbConn();
    pedidosModel.deletarPedido(db, pedidoId, (err, result) => {
        if (err) {
            console.error('Erro ao deletar pedido:', err);
            return res.status(500).send('Erro ao deletar pedido');
        }
        res.redirect('/adm');
    });
};

module.exports.editarPedidoFromAdm = (app, req, res) => {
    const pedidoId = req.params.id;
    const db = dbConn();
    pedidosModel.getPedidoById(db, pedidoId, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            return res.status(500).send('Erro');
        }
        if (!rows || rows.length === 0) return res.status(404).send('Pedido não encontrado');
        const pedido = rows[0];
        pedidosModel.getUsuarios(db, (err2, usuarios) => {
            if (err2) usuarios = [];
            res.render('editarPedido.ejs', { pedido, usuarios });
        });
    });
};

module.exports.atualizarPedidoFromAdm = (app, req, res) => {
    const pedidoId = req.params.id;
    const { costureiro, descricao, valor, estado } = req.body;
    const db = dbConn();
    pedidosModel.atualizarPedido(db, pedidoId, costureiro, descricao, valor, estado, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pedido:', err);
            return res.status(500).send('Erro ao atualizar');
        }
        res.redirect('/adm');
    });
};

module.exports.novoClienteForm = (app, req, res) => {
    res.render('novoCliente.ejs');
};

module.exports.criarCliente = (app, req, res) => {
    const { nome, email, endereco, sexo, telefone } = req.body;
    const db = dbConn();
    if (!nome || !email) {
        return res.status(400).render('novoCliente.ejs', { error: 'Nome e email são obrigatórios.' });
    }
    const sql = 'INSERT INTO Clientes (Nome, Email, Endereco, Sexo, Telefone) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, email, endereco, sexo, telefone], (err, result) => {
        if (err) {
            console.error('Erro ao criar cliente:', err);
            return res.status(500).render('novoCliente.ejs', { error: 'Erro ao criar cliente.' });
        }
        res.redirect('/adm');
    });
};

