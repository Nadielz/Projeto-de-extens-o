const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./app/routes/routes.js');
const db = require('./config/db.js');


const app = express();
const port = process.env.PORT || 8080;

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
  if (req.session) req.session.destroy(() => res.redirect('/login'));
  else res.redirect('/login');
});

app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

routes.home(app);
routes.login(app);
routes.servicos(app);
if (typeof routes.pedidos === 'function') routes.pedidos(app);
if (typeof routes.adm === 'function') routes.adm(app);
if (typeof routes.loginPost === 'function') routes.loginPost(app);
if (typeof routes.cadastro === 'function') routes.cadastro(app);

app.get('/', (req, res) => res.send('Servidor funcionando!'));

app.listen(port, '0.0.0.0', () => console.log(`Servidor rodando na porta: http://localhost:${port}`));

module.exports = { app, db };
