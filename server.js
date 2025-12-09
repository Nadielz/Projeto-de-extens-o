const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./app/routes/routes.js');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8080;

const db = mysql.createPool({
  host: process.env.MYSQLHOST || 'mysql.railway.internal',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'rjsEdPfyBOxQShDLWepsENaQnQeQaJeo',
  database: process.env.MYSQLDATABASE || 'railway',
  port: Number(process.env.MYSQLPORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
  } else {
    console.log("Conectado ao MySQL!");
    connection.release();
  }
});

app.set("view engine", "ejs");
app.set('views', './app/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;"
  );
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'chave_temporaria',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session ? req.session.user : null;
  next();
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => res.redirect('/login'));
  } else {
    res.redirect('/login');
  }
});

app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

routes.home(app);
routes.login(app);
routes.servicos(app);
if (typeof routes.pedidos === 'function') routes.pedidos(app);
if (typeof routes.adm === 'function') routes.adm(app);
if (typeof routes.loginPost === 'function') routes.loginPost(app);
if (typeof routes.cadastro === 'function') routes.cadastro(app);

app.listen(port, '0.0.0.0', () => console.log(`Servidor rodando na porta: http://localhost:${port}`));

module.exports = { app, db };
