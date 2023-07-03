import React from 'react';

import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
        <a href='#Clientes'>Clientes</a>
        <a href='#Fornecedores'>Fornecedores</a>
        <a href='#Serviços'>Serviços</a>
    </div>
  );
}

export default Sidebar;