import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({children}) {

  const [entitySelected, setEntitySelected] = useState('cliente');
  const [currentUser, setCurrentUser] = useState(() => {
    return sessionStorage.getItem('currentUser') || '';
  });
  const [authToken, setAuthToken] = useState(
    () => {
      // Obter o token armazenado no sessionStorage, se existir
      return sessionStorage.getItem('authToken') || null;
    }
  );

  useEffect(() => {
    // Atualizar o sessionStorage sempre que o token mudar
    if (authToken) {
      sessionStorage.setItem('authToken', authToken);
    } else {
      sessionStorage.removeItem('authToken');
    }
  }, [authToken]);

  const value = {
    entitySelected,
    setEntitySelected,
    currentUser, 
    setCurrentUser,
    authToken,
    setAuthToken
  };

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;
