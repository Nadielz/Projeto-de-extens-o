const express = require('express');
const routes = require('./app/routes/routes.js');
const path = require('path');


const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.set('views', './app/views'); //Definição do local das views
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))


app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

routes.home(app);
routes.login(app);
routes.servicos(app);
routes.adm(app);

app.listen(port, function () {
    console.log('Servidor rodando na porta: http://localhost:5000');
})