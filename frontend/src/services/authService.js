const authUser = async (login) => {

  try {
    // Envia as credenciais de login para o backend usando fetch
    const response = await fetch('http://localhost:3333/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    });

    return response;
  
  } catch (error) {
    console.error('Erro de autenticação:', error);
    return error;
  }
};

const fetchVerifyToken = async () => {
  try {
    const response = await fetch('http://localhost:3333/auth/verify-token',  {
      headers: {
        'authorization': sessionStorage.getItem('authToken'),
      },
      //body: JSON.stringify(login),
    });
    //console.log(response);
    return response;

  } catch (error) {
    console.error('Erro ao verificar Token:', error);
    return error;
  }
};

const fetchRefreshToken = async () => {
  try {
    const response = await fetch('http://localhost:3333/auth/refresh-token',  {
      body: JSON.stringify(sessionStorage.getItem('refreshToken')),
    });
    return response;

  } catch (error) {
    console.error('Erro ao verificar Refresh Token:', error);
    return error;
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  authUser,
  fetchVerifyToken,
  fetchRefreshToken,
};
