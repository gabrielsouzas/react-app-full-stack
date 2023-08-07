import React, { useContext } from 'react';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import AppContext from '../../context/AppContext';
import authService from '../../services/authService';
//import { isTokenExpired } from '../../utils/auth';

function Home() {

  const { authToken } = useContext(AppContext);

  /*const history = useHistory();

  useEffect(() => {
    // Verificar se o token está no localStorage ou sessionStorage
    const token = sessionStorage.getItem('authToken');

    // Verificar se o token ainda é válido
    if (!token || isTokenValid(token)) {
      // Redirecionar para a página de login se o token estiver expirado ou não existir
      history.push('/login');
    }
  }, [history]);*/

  /*
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  */

  const isTokenValid = async () => {
    try {
      const response =  await authService.fetchVerifyToken();
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.status === '200') {
          //console.log(data.status, data.message);
          return true;
        } else {
          console.log('Erro ao validar Token', data.status, data.message);
          return false;
        }
      } else return false;
    } catch (error) {
      console.log('Erro ao tentar validar Token. Erro: ', error);
      return false;
    }
  };

  const handleNotAuthenticated = () => {
    console.log(authToken);
  };

  const validateToken = async () => {
    if (authToken) {
      const response = await isTokenValid();
      console.log(response);
      if(!isTokenValid()) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  };

  return (
    <>
      {(validateToken() && 
        <>
          <Header />
          <Main />
        </>) || handleNotAuthenticated()
      }
    </>
  );
}

export default Home;

