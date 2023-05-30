const express = require('express'); 
const router = express.Router(); 
const modeloUsuario = require('../models/usuario');
const { model } = require('mongoose');

router.get('/usuario', async (req, res) => {
    try{
        const usuarios = await modeloUsuario.find(); 
        res.json({ usuarios }); 
    } catch (err){
        console.error(err); 
        res.status(500).json({ error: 'Não foi possível obter os usuários'}); 
    }
});

router.post('/usuario', async (req, res) => {
        const usuarioData = new modeloUsuario.usuarioSchema ({
            usuarioNome: req.body.usuarioNome,
            usuarioSenha: req.body.usuarioSenha
        }); 

        usuarioData.save(( err => {
            if(err){
                console.error(err);
                res.status(500).send('Erro ao salvar os dados no banco de dados');
            } else {
                res.status(200).send('Dados salvos com sucesso');
            }
            }
        ));
});

router.put('/usuario/:id', async (req, res) => {
    const { id } = req.params; 
    const { vitorias } = req.body; 

    try {
        const usuario = await modeloUsuario.Usuario.findById(id); 
        if (!usuario){
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        usuario.usuarioVitorias = vitorias; 
        await usuario.save(); 

        res.status(200).json({ message: 'Número de vitórias atualizado com sucesso' });
    } catch (err) { 
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar o número de vitórias' });
    }
});

router.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const usuario = await modeloUsuario.Usuario.findById(id); 
        if (!usuario){
            return res.status(404).json({ error: 'Usuário não encontrado '}); 
        }

        await usuario.remove(); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Erro ao deletar o recorde do usuário'}); 
    }
});