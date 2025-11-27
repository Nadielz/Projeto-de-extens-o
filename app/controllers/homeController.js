const dbConn = require('../../config/db');

const homeModel = require('../models/homeModel');

module.exports.home = (app, req, res) => {
    console.log('Controller da home executado');
    res.render('home.ejs');
}
