/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import './Home.css';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import AppContext from '../../context/AppContext';
import authService from '../../services/authService';
import Loading from '../../components/Loading/Loading';
//import { isTokenExpired } from '../../utils/auth';

function Home() {

  const { authToken } = useContext(AppContext);

  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      const isValid = await isTokenValidated();
      setIsTokenValid(isValid);
      setIsLoading(false);
    }
    checkToken();
  }, []);

  /*if (isLoading) {
    return <p>Loading...</p>;
  }*/

  //const [isTokenValid, setIsTokenValid] = useState(false);
  
  /*const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o token está no localStorage ou sessionStorage
    //const token = sessionStorage.getItem('authToken');

    // Verificar se o token ainda é válido
    const tk = validateToken();
    console.log(tk);
    console.log(authToken);
    if (tk) {
      // Redirecionar para a página de login se o token estiver expirado ou não existir
      //navigate.push('/');
      console.log('Token validado');
      setIsTokenValid(true);
    } else {
      console.log('Token invalido');
      setIsTokenValid(false);
    }

    console.log(isTokenValid);
  }, [navigate]);*/

  /*
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  */

  /*const isTokenValidated = () => {
    if (authToken) {
      if (validateToken()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };*/

  const isTokenValidated = async () => {
    if (authToken) {
      try {
        const isValid = await validateToken();
        return isValid;
      } catch (error) {
        console.error('Error validating token: ', error);
        return false;
      }
    } else {
      return false;
    }
  };

  const validateToken = async () => {
    try {
      const response =  await authService.fetchVerifyToken();
      if (response.ok) {
        const {status , message} = await response.json();
        if (status == 200) {
          console.log(`Token válido. Status: ${status}, Mensagem: ${message}.`);
          return true;
        } else {
          console.log(`Token inválido. Status: ${status}, Mensagem: ${message}.`);
          return false;
        }
      } else {
        console.log(`Token inválido. Status: ${response.status} - Erro: ${response.statusText}`);
        return false;
      }
    } catch (error) {
      console.log('Não foi possível validar o Token', error);
      return false;
    }
  };

  const validateToken_old = async () => {
    if (authToken) {
      try {
        const response =  await authService.fetchVerifyToken();
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.status == 200) {
            //console.log(data.status, data.message);
            return true;
            //setIsTokenValid(true);
            //return;
          } else {
            console.log('Erro ao validar Token', data.status, data.message);
            //return false;
            //setIsTokenValid(false);
          }
        } else {
          console.log(`Erro ao validar Token. Status: ${response.status} - Erro: ${response.statusText}`);
          //return false;
          //setIsTokenValid(false);
        }
      } catch (error) {
        console.log('Erro ao tentar validar Token. Erro: ', error);
        return false;
      }
    }
    //setIsTokenValid(false);
    return false;
  };

  const handleNotAuthenticated = () => {
    console.log('Token não autenticado');
  };

  /*const validateToken = () => {
    if (authToken) {
      if(isTokenValid()) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  };*/

  /*return (
    (isTokenValidated() && <>
      <Header />
      <Main />
    </>) || (
      handleNotAuthenticated()
    )
  );*/

  return (
    <>
      { (isLoading && <Loading />) || (isTokenValid && 
        <>
          <Header />
          <Main />
        </>) || (<Navigate to="/" />)
      }
    </>
  );

  /*return (
    <>{isTokenValid ? <><Header /><Main/></> : <Navigate to="/" />}</>
  );*/
}

export default Home;

