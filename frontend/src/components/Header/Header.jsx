import React from 'react';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <a href="#home" className="header-title">Software Name</a>
      <div className="header-container">
        <input type="text" name="search" id="search" placeholder="Pesquisar" />
      </div>
    </header>
  );
}

export default Header;
