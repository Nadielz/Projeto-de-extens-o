const dbConn = require('../../config/db');
//const { getPaintings } = require('../models/homeModel');
module.exports.home = (app, req, res) => {
    console.log('Controller da home');
    //const db = dbConn();
        res.render('home.ejs')
    };

