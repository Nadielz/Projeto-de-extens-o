const dbConn = require('../../config/db');
//const { getPaintings } = require('../models/homeModel');
module.exports.servicos = (app, req, res) => {
    console.log('Controller da servicos');
    //const db = dbConn();
        res.render('servicos.ejs')
    };
