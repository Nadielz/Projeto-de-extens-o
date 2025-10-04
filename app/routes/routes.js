/// fazer dps


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


}