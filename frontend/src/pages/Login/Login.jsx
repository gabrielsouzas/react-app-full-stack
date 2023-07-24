import React, { useState } from 'react';
import authService from '../../services/authService';
import userService from '../../services/userService';
import './Login.css';

function Login() {

  const [token, setToken] = useState('');
  const [username, setUsername] = useState('super');
  const [password, setPassword] = useState('super');

  const [email, setEmail] = useState('super@gmail.com');

  // Função para lidar com o envio do formulário de login
  // eslint-disable-next-line no-unused-vars
  const handleLogin = async (e) => {
    e.preventDefault();

    setUsername('super');
    setPassword('super');

    try {
      // Envia as credenciais de login para o backend usando fetch
      const response = await authService.authUser({
        username,
        password,
      });
      
      // Verifica se a resposta foi bem-sucedida antes de processar o corpo
      if (response.ok) {
        const data = await response.json();
        // Armazena o token JWT retornado pelo backend
        setToken(data.token);
        
        console.log(token);
      } else {
        console.error('Erro de autenticação:', response.status);
      }
    } catch (error) {
      console.error('Erro de autenticação:', error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleInsertUser = () => {

    setUsername('super');
    setPassword('super');
    setEmail('super@gmail.com');

    userService.insertUser({
      username,
      password,
      email,
    }).then((response)=>{
      response.status === 201 ? alert('Usuário inserido com sucesso!') : alert('Erro ao inserir Usuário.');
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>LOGIN</h2>
        <form>
          <div className="user-box">
            <input type="text" name="" required />
            <label>Usuário</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required />
            <label>Senha</label>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
