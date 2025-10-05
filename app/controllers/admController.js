const dbConn = require('../../config/db');
module.exports.adm = (app, req, res) => {
    console.log('Controller da tela de adm');
        res.render('adm.ejs')
    };
