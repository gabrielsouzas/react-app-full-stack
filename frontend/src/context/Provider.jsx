import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({children}) {

  const [entitySelected, setEntitySelected] = useState('cliente');
  const [currentUser, setCurrentUser] = useState('');

  const value = {
    entitySelected,
    setEntitySelected,
    currentUser, 
    setCurrentUser
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
