var express = require('express'); 
var dotenv = require('dotenv').config(); 
var mongoose = require('mongoose'); 
var cors = require('cors'); 

const modeloUsuario = require('./models/usuario'); 
const usuarioController = require('./controllers/usuarioController'); 
const usuarioRouter = require('./routers/usuarioRouter'); 

const app = express(); 

app.use(express.json()); 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors()); 

mongoose.connect(process.env.DB_URL);

app.get('/usuario', usuarioController.pegarUsuarios);

app.get('/usuario/:id', usuarioController.pegarUsuario);

app.post('/usuario', usuarioController.criarUsuario); 

app.put('/usuario/:id', usuarioController.atualizarVitorias);

app.delete('/usuario/:id', usuarioController.apagarUsuario); 

app.listen(process.env.PORT); 