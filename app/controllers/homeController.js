const dbConn = require('../../config/db');

const homeModel = require('../models/homeModel');

module.exports.home = (app, req, res) => {
    console.log('Controller da home executado');
    
    const db = dbConn();

    homeModel.getPedidos(db, (error, result) => {
        
        if (error) {
            console.log("Erro ao buscar pedidos:", error);
            res.send("Ocorreu um erro ao consultar os dados.");
            return;
        }
        console.log("Pedidos encontrados:", result);
        res.render('home.ejs', { pedidos: result });
    });
}
