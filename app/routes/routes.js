const { novoPedidoForm } = require('../controllers/pedidosController');
const { home } = require('../controllers/homeController');
const { login } = require('../controllers/loginController');
const { servicos } = require('../controllers/servicosController');
const { adm } = require('../controllers/admController');

module.exports = {
        home: (app) => {
        app.get('/', (req, res) => {
            home(app, req, res);
        });
        
    },
    pedidos: (app) => {
        const pedidosController = require('../controllers/pedidosController');
        app.get('/pedidos/novo', (req, res) => {
            pedidosController.novoPedidoForm(app, req, res);
        });
        app.post('/pedidos/novo', (req, res) => {
            pedidosController.criarPedido(app, req, res);
        });
        app.get('/pedidos/:id/editar', (req, res) => {
            pedidosController.editarPedidoForm(app, req, res);
        });
        app.post('/pedidos/:id/editar', (req, res) => {
            pedidosController.atualizarPedido(app, req, res);
        });
        app.post('/pedidos/:id/delete', (req, res) => {
            pedidosController.deletarPedido(app, req, res);
        });
        app.get('/pedidos', (req, res) => {
            pedidosController.getPedidos(app, req, res);
        });
   },
        login: (app) => {
        app.get('/login', (req, res) => {
            login(app, req, res);
        });
    },        
        loginPost: (app) => {
        app.post('/login', (req, res) => {
            const loginController = require('../controllers/loginController');
            if (loginController && typeof loginController.autenticar === 'function') {
                loginController.autenticar(app, req, res);
            } else {
                res.status(500).send('Handler de login não implementado');
            }
        });
    },
        servicos: (app) => {
        app.get('/servicos', (req, res) => {
            servicos(app, req, res);
        });
    },        
        adm: (app) => {
        const admController = require('../controllers/admController');
        app.get('/adm', (req, res) => {
            adm(app, req, res);
        });
        app.get('/adm/usuarios/:id/editar', (req, res) => {
            admController.editarUsuarioForm(app, req, res);
        });
        app.post('/adm/usuarios/:id/editar', (req, res) => {
            admController.atualizarUsuario(app, req, res);
        });
        app.post('/adm/usuarios/:id/delete', (req, res) => {
            admController.deletarUsuario(app, req, res);
        });

        app.get('/adm/clientes/novo', (req, res) => {
            admController.novoClienteForm(app, req, res);
        });
        app.post('/adm/clientes/novo', (req, res) => {
            admController.criarCliente(app, req, res);
        });
        app.get('/adm/clientes/:id/editar', (req, res) => {
            admController.editarClienteForm(app, req, res);
        });
        app.post('/adm/clientes/:id/editar', (req, res) => {
            admController.atualizarCliente(app, req, res);
        });
        app.post('/adm/clientes/:id/delete', (req, res) => {
            admController.deletarCliente(app, req, res);
        });

        app.get('/adm/pedidos/:id/editar', (req, res) => {
            admController.editarPedidoFromAdm(app, req, res);
        });
        app.post('/adm/pedidos/:id/editar', (req, res) => {
            admController.atualizarPedidoFromAdm(app, req, res);
        });
        app.post('/adm/pedidos/:id/delete', (req, res) => {
            admController.deletarPedidoAdm(app, req, res);
        });
    },

        cadastro: (app) => {
        app.post('/cadastro', (req, res) => {
            const loginController = require('../controllers/loginController');
            if (loginController && typeof loginController.cadastrar === 'function') {
                loginController.cadastrar(app, req, res);
            } else {
                res.status(500).send('Handler de cadastro não implementado');
            }
        });
    },


}