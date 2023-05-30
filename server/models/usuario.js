const mongoose = require('mongoose'); 

const usuarioSchema = new mongoose.Schema({
    usuarioNome: {
        type: String,
        required: true
    },
    usuarioSenha: {
        type: String, 
        required: true
    },
    usuarioVitorias: {
        type: Number, 
        default: 0, 
        required: false,
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema); 

module.exports = { Usuario, usuarioSchema }; 