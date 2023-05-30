const { Usuario } = require('../models/usuario'); 
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv').config(); 

const pegarUsuarios = async (req, res) => {
    const usuario = await Usuario.find(); 
    res.json({usuario: usuario}); 
}

const pegarUsuario = async (req, res) => {
    const usuarioId = req.params.id; 
    const usuario = await Usuario.findById(usuarioId); 

    res.json({usuario}); 
}

const criarUsuario = async (req, res) => {
    const usuarioNome = req.body.usuarioNome; 
    const usuarioSenha = req.body.usuarioSenha; 

    const usuario = await Usuario.create({
        usuarioNome: usuarioNome,
        usuarioSenha: usuarioSenha,
    }); 

    if(usuario){
        //Gerar Token
        const TokenAccess = jwt.sign({id:usuario.id}, process.env.TOKEN_KEY); 
        res.json({TokenAccess: TokenAccess, usuario: usuario}); 
    };

    //res.json({usuario: usuario}); 
}

const atualizarVitorias = async (req, res) => {
    const usuarioId = req.params.id; 
    const usuarioVitorias = req.body.usuarioVitorias;

    await Usuario.findByIdAndUpdate(usuarioId, {
        usuarioVitorias: usuarioVitorias
    }); 

    const usuario = await Usuario.findById(usuarioId);

    res.json({usuario: usuario}); 
}

const verificar = async (req, res, next) => {
    const AutHeader = req.headers.authorization; 
    if (AutHeader) {
        const token = AutHeader.split(" ")[1]; 
        jwt.verify(token, process.env.TOKEN_KEY, (err, usuario) => {
            if(err){
                return res.status(401).json("Token inválido."); 
            }

            req.usuario = usuario; 
            next();
        }); 
    } else {
        res.status(401).json("Sem autorização no momento.");
    }
}


const apagarUsuario = async (req, res) => {
    const usuarioId = req.params.id;

    const usuario = await Usuario.findByIdAndDelete(usuarioId); 

    res.json({usuario: usuario}); 
}; 

/*
const apagarUsuario = async (req, res) => {
    const usuarioId = req.params.id;

    if(req.usuario.id === usuarioId){
        res.status(200).json("Usuário deletado."); 
    } else{
        res.status(403).json("Operação falhada."); 
    }
}
*/

//    const usuario = await modeloUsuario.findByIdAndDelete(usuarioId); 

//    res.json({usuario: usuario}); 


module.exports = {
    pegarUsuarios: pegarUsuarios, 
    pegarUsuario: pegarUsuario, 
    criarUsuario: criarUsuario,
    apagarUsuario: apagarUsuario, 
    atualizarVitorias: atualizarVitorias,
    verificar: verificar,
}; 