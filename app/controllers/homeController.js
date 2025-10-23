const dbConn = require('../../config/db');

const homeModel = require('../models/homeModel');

module.exports.home = (app, req, res) => {
    console.log('Controller da home executado');
    
    const db = dbConn();

    homeModel.getClientes(db, (error, result) => {
        
        if (error) {
            console.log("Erro ao buscar clientes:", error);
            res.send("Ocorreu um erro ao consultar os dados.");
            return;
        }
        
        console.log("Clientes encontrados:", result);
        res.render('home.ejs', { clientes: result });
    });
};
