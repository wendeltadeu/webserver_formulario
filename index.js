// modulo express
const express = require('express');
// modulo body-parse para extrair informações geradas no html da página web.
const bodyparser = require('body-parser');
const app = express();
const path = require("path");

//porta da aplicação
let port = 3000;

const meu_middleware = function(req, res, next){
  console.log("Executando página raiz");
  next();
}
// midleware que só funciona para a rota /raiz
app.get('/',(req, res) => {
  res.send("Estou na raiz.");
});



//rota que vai receber o body-parse com tratamento do body
app.use(bodyparser.urlencoded({extended: false}));
// definição da rota e da pasta que vai receber os arquivos publicos
// acessiveis no diretorio public/login na rota /login

app.use(meu_middleware);

app.use('/login', express.static(__dirname + '/public/login'));
app.post('/login', (req, res) => {
  console.log("Nome:" + req.body.nome_login);
  console.log("Senha:" + req.body.senha);
});

// definição da rota e da pasta que vai receber os arquivos publicos
// acessiveis no diretorio public/formulario na rota /form
app.use('/formulario', express.static(__dirname + '/public/formulario'));
app.post('/form', (req, res) => {
  console.log("Seu Nome:" + req.body.nome_cad);
  console.log("Seu e-mail:" + req.body.email_cad);
  console.log("Seu senha:" + req.body.senha_cad);
});

app.get('*', (req, res) => {
  res.send("<h1>Link inválido: 404</h1>");
});


app.listen(port, () => console.log(`Escutando na porta ${port}`)); // comando que o servidor fica escutando a aplicação