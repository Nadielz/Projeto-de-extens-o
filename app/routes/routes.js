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
        app.get('/adm', (req, res) => {
            adm(app, req, res);
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