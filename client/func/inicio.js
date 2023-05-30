const DB_URL = "http://localhost:3000/usuario"; 

const pegarDados = async () => {
    axios.get(DB_URL)
        .then(resposta => {
            const usuarioData = resposta.data; 
            console.log(usuarioData); 
        })
        .catch (err => {
            console.error(err); 
        }); 
}

const cadastrarUsuario = async () => {
    const formulario = document.getElementById('cadastroForm'); 
    formulario.addEventListener('submit', enviarUsuario); 
}

const fazerLogin = async () => {
    const usuarioForm = document.getElementById('loginUsuarioForm');
    usuarioForm.addEventListener('submit', verificarLogin); 
}

function enviarUsuario (event) {
    event.preventDefault(); 
    const inputNome = document.getElementById('cadastroUsuarioNome').value; 
    const inputSenha = document.getElementById('cadastroUsuarioSenha').value; 

    const input = { usuarioNome: inputNome, usuarioSenha: inputSenha }; 

    axios.post(DB_URL, input)
    .then(resposta => {
        console.log(resposta);
    })
    .catch(err => {
        console.error(err); 
    });
}

function verificarLogin (event) {
    event.preventDefault(); 
    const inputNome = document.getElementById('LusuarioNome').value; 
    const inputSenha = document.getElementById('LusuarioSenha').value; 

    axios.get(DB_URL)
    .then(resposta => {
        const usuario = resposta.data.usuario;
        const usuarioEncontrado = usuario.find(usuario => usuario.usuarioNome == inputNome && usuario.usuarioSenha == inputSenha);

        if(usuarioEncontrado){
            console.log('Deu certo o teste!!!');
            usuarioLoginNome = usuarioEncontrado.usuarioNome; 
            window.location.href = 'index.html';
        } else{
            console.log('Usuário ou senha inválidos!'); 
        }
    })
    .catch(err => {
        console.error(err);
    });
}

document.addEventListener('DOMContentLoaded', cadastrarUsuario);
document.addEventListener('DOMContentLoaded', fazerLogin);

