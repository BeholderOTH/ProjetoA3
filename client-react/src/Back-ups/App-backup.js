import './App.css';
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';  
import Sudoku from './utils/sudokuReact.js'; 
//import darkM from './utils/darkM'; 

function App() {
  const DB_URL = "http://localhost:3000/usuario"; 
  const [usuarios, setUsuarios] = useState([]); 
  const [mensagemErro, setMensagemErro] = useState(''); 
  const [checarLogin, setChecarLogin] = useState(''); 

  const pegarData = async () => {
    try{
    const resposta = await axios.get(DB_URL);
    setUsuarios(resposta.data.usuario);
    } catch (err) {
    console.log(err); 
    }
  }

  useEffect(() => {
    pegarData();  
  }, []); 

  const enviarUsuario = async (event) => {
    event.preventDefault(); 

    const usuario = {
      usuarioNome: event.target.usuarioNome.value, 
      usuarioSenha: event.target.usuarioSenha.value, 
    };

    try {
      await axios.post(DB_URL, usuario);
      pegarData(); 
    } catch (err) {
      console.log(err);
    }
  }

  const loginUsuario = async (event) => {
    event.preventDefault(); 

    const usuario = {
      usuarioNome: event.target.usuarioNome.value, 
      usuarioSenha: event.target.usuarioSenha.value,
    }; 

    const usuarioVerif = usuarios.find((u) => u.usuarioNome === usuario.usuarioNome && u.usuarioSenha === usuario.usuarioSenha);

    if (!usuarioVerif){
      setMensagemErro("Usuário ou senha inválidos.");
    }
    else {
      setChecarLogin(true); 
    }
  }
  
  return (
    <div className="App">
      { checarLogin ? (

          <div>
            <title>Sudoku - A3</title>
            <link rel="icon" href="./components/img/sudokuL.jpg"></link>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            <link rel="stylesheet" href="./App.css"></link>
            <nav>
            <div class = "navegador">
              <a href="#" class="navegador-logo">
                  Sudoku 
              </a>
            </div>
            <div class = "ativar-modo-escuro" id="ativar-modo-escuro">
              <i class = "bx bx-sun"></i>
              <i class = "bx bx-moon"></i>
            </div>
            </nav>
            <div className = "sudoPratico">
               <h2 class = "erroDisplay">Erros:</h2>
               <hr></hr>
               <br></br>
               <Sudoku />
               <div id = "grade"></div>
               <br></br>
               <div id = "digitos"></div>
               </div>
          </div>
        ) : (

      <fieldset id = "maxField">

      <fieldset id = "Cadastro">
      <legend>Cadastro</legend>
      <form onSubmit = { enviarUsuario }>
        <p>
        <label for = "">Usuário:</label>
        <input type = "text" name = "usuarioNome"></input>
        </p>
        
        <p>
        <label for = "">Senha:</label>
        <input type = "password" name = "usuarioSenha"></input>
        </p>

        <button type = "submit">Criar usuário</button>
      </form>
      </fieldset>

      <fieldset id = "Login">
      <legend>Login</legend>
      <form onSubmit = { loginUsuario }>
        <p>
          <label for = "">Usuário:</label>
          <input type = "text" name = "usuarioNome"></input>
        </p>

        <p>
          <label for = "">Senha:</label>
          <input type = "password" name = "usuarioSenha"></input>
        </p>

        <button type = "submit">Entrar</button>

      </form>
      {mensagemErro && (<p id = "LoginInvalido">{ mensagemErro }</p>)}
      </fieldset>

      </fieldset>
      )}
    </div>
  );
};

//GET de todos os usuários
/*usuarios.map((usuario) => (
  <div key = {usuario._id}>
    <p>Nome: {usuario.usuarioNome}</p>
    <p>Senha: {usuario.usuarioSenha}</p>
  </div>)) */

export default App;
