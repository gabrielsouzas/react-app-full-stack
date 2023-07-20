import React, { useState } from 'react';
import authService from '../../services/authService';

function Login() {

  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para lidar com o envio do formulário de login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envia as credenciais de login para o backend usando fetch
      const response = await authService.authUser({
        username,
        password
      });

      // Verifica se a resposta foi bem-sucedida antes de processar o corpo
      if (response.ok) {
        const data = await response.json();
        // Armazena o token JWT retornado pelo backend
        setToken(data.token);
      } else {
        console.error('Erro de autenticação:', response.status);
      }
    } catch (error) {
      console.error('Erro de autenticação:', error);
    }
  };

  return (
    <div></div>
  );
}

export default Login;
