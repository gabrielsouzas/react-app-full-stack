import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

import './Header.css';

function Header() {

  const { currentUser } = useContext(AppContext);

  return (
    <header className="header">
      <a href="#home" className="header-title">React App</a>
      <div className="header-container">
        {/*<input type="text" name="search" id="search" placeholder="Pesquisar" />*/}
        <h2>Bem vindo(a) <span>{currentUser}</span></h2>
      </div>
    </header>
  );
}

export default Header;
