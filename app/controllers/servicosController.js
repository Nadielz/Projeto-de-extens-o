const dbConn = require('../../config/db');
module.exports.servicos = (app, req, res) => {
    console.log('Controller da servicos');
        res.render('servicos.ejs')
    };
