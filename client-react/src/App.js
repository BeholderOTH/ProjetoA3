import './App.css';
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';  
import SudokuHTML from './index.html'; 
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
            <div>
      <div dangerouslySetInnerHTML={{ __html: SudokuHTML }} />
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
