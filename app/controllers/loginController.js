const dbConn = require('../../config/db');
module.exports.login = (app, req, res) => {
    console.log('Controller do login');
        res.render('login.ejs')
    };
