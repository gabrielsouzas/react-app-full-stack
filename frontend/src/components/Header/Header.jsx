import React from 'react';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <a href="#home" className="header-title">React App</a>
      <div className="header-container">
        {/*<input type="text" name="search" id="search" placeholder="Pesquisar" />*/}
        <h2>Bem vindo Administrador</h2>
      </div>
    </header>
  );
}

export default Header;
