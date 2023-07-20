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

// eslint-disable-next-line no-undef
module.exports = {
  authUser,
};
