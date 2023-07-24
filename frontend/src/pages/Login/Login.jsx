import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import authService from '../../services/authService';
import userService from '../../services/userService';
import Loading from '../../components/Loading/Loading';
import AppContext from '../../context/AppContext';

import './Login.css';

function Login() {

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [email, setEmail] = useState('super@gmail.com');

  const { setCurrentUser } = useContext(AppContext);

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Envia as credenciais de login para o backend usando fetch
      const response = await authService.authUser({
        username,
        password,
      });
      
      // Verifica se a resposta foi bem-sucedida antes de processar o corpo
      if (response.ok) {
        const data = await response.json();
        
        if (data.status === 'error') {
          setError(data.message);
        } else {
          // Armazena o token JWT retornado pelo backend
          setToken(data.token);
          setIsAuthenticated(true);
          setCurrentUser(username);
          console.log('Usuário Logado');
          setError(null);
        }
        setLoading(false);
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

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="user-box">
            <input 
              type="text" 
              name=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <label>Usuário</label>
          </div>
          <div className="user-box">
            <input
              type="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <label>Senha</label>
          </div>
          {error && <span className="login-error">{error}</span>}
          {
            (loading && <button>Entrando <Loading /></button>) || 
            <button type="submit">Entrar</button>
          }
          
        </form>
      </div>
    </div>
  );
}

export default Login;
