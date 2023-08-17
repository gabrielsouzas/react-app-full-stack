/* Arquivo para fazer a interceptação das requisições, colocar um cabeçalho com o acessToken e verificar se é necessário fazer um refreshToken */

import { fetchWhitelist } from '../services/whitelistService';

const baseUrl = 'http://localhost:3333';

const fetchWrapper = async (url, options) => {
  // Verifica se há um token e adiciona um cabeçalho de autorização
  const token = sessionStorage.getItem('authToken');
  
  if (token) {
    if (options)  {
      if ('headers' in options) {
        options.headers = {
          ...options.headers,
          'authorization': `${token}`,
        };
      } else {
        options = {
          ...options,
          'headers': {
            'authorization': `${token}`,
          }
        };
      }
    } else {
      options = {
        'headers': {
          'authorization': `${token}`,
        }
      };
    }
  }
  
  const response = await fetch(`${baseUrl}${url}`, options);
  // Verifica a resposta e atualiza o token, se necessário
  if (response.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      options.headers.authorization = `${newToken}`;
      return fetchWrapper(url, options);
    }
  }

  return response;
};

// eslint-disable-next-line no-unused-vars
const refreshToken = async () => {
  try {
    const response = await fetch(`${baseUrl}/auth/refresh-token`,  {
      method: 'POST',
      headers: {
        'authorization': sessionStorage.getItem('refreshToken'),
      },
      //body: JSON.stringify(sessionStorage.getItem('refreshToken')),
    });
    
    const { refreshToken } = await response.json();
    
    const newToken = refreshToken.accessToken;

    // Atualize o token no armazenamento
    sessionStorage.setItem('authToken', newToken);

    return newToken;
    
  } catch (error) {
    console.error('Erro ao verificar Refresh Token:', error);
    return error;
  }
};

// eslint-disable-next-line no-unused-vars
const checkWhiteList = async (token) => {
  try {
    const response = await fetchWhitelist(token);
    console.log(response);
    /*if (response.ok) {
      const data = await response.json();
      if (data.status == 200) {
        return true;
      }
    }*/
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default fetchWrapper;
