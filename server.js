const express = require('express');
const routes = require('./app/routes/routes.js');
const session = require('express-session');
const path = require('path');


const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.set('views', './app/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;");
  next();
});


app.use(session({
  secret: 'troque_esta_chave_por_variavel_de_ambiente',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

function checkAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}

app.use((req, res, next) => {
  res.locals.user = req.session ? req.session.user : null;
  next();
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      return res.redirect('/login');
    });
  } else {
    return res.redirect('/login');
  }
});


app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

routes.home(app);
routes.login(app);
routes.servicos(app);
if (typeof routes.pedidos === 'function') routes.pedidos(app);
if (typeof routes.adm === 'function') routes.adm(app);
if (typeof routes.loginPost === 'function') routes.loginPost(app);
if (typeof routes.cadastro === 'function') routes.cadastro(app);

app.listen(port, function () {
    console.log('Servidor rodando na porta: http://localhost:5000');
})