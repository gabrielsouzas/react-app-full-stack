/* Arquivo para fazer a interceptação das requisições, colocar um cabeçalho com o acessToken e verificar se é necessário fazer um refreshToken */

const baseUrl = 'http://localhost:3333';

const fetchWrapper = async (url, options) => {
  // Verifica se há um token e adiciona um cabeçalho de autorização
  const token = sessionStorage.getItem('authToken');
  if (token) {
    options.headers = {
      ...options.headers,
      'authorization': `Bearer ${token}`,
    };
  }

  const response = await fetch(`${baseUrl}${url}`, options);

  // Verifica a resposta e atualiza o token, se necessário
  if (response.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      options.headers.authorization = `Bearer ${newToken}`;
      return fetchWrapper(url, options);
    }
  }

  return response;
};

const refreshToken = async () => {
  try {
    const response = await fetch(`${baseUrl}/auth/refresh-token`,  {
      method: 'POST',
      headers: {
        'authorization': sessionStorage.getItem('refreshToken'),
      },
      //body: JSON.stringify(sessionStorage.getItem('refreshToken')),
    });
        
    const data = await response.json();
    const newToken = data.authToken;

    // Atualize o token no armazenamento
    sessionStorage.setItem('authToken', newToken);

    return newToken;
    
  } catch (error) {
    console.error('Erro ao verificar Refresh Token:', error);
    return error;
  }
};

export default fetchWrapper;
