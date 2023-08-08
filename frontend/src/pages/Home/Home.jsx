import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import './Home.css';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import AppContext from '../../context/AppContext';
import authService from '../../services/authService';
import Loading from '../../components/Loading/Loading';

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

  return (
    <>
      { (isLoading && <Loading className="loading-home" />) || (isTokenValid && 
        <>
          <Header />
          <Main />
        </>) || (<Navigate to="/" />)
      }
    </>
  );

}

export default Home;

