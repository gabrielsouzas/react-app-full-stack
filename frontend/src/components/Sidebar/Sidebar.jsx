import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';

import { BsPeopleFill } from 'react-icons/bs';
import { MdOutlineFactory } from 'react-icons/md';
import { AiOutlineCar } from 'react-icons/ai';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {

  const [activeButton, setActiveButton] = useState('cliente');

  const { setEntitySelected } = useContext(AppContext);

  const handleClick = (entity) => {
    setActiveButton(entity);
    setEntitySelected(entity);
  };


  const handleLogOut = () => {
    // Inserir logout do token aqui
    console.log('teste');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-entities">
        <button 
          className={activeButton === 'cliente' ? 'active' : ''}
          onClick={() => handleClick('cliente')}
        > <BsPeopleFill /> Clientes</button>
        <button 
          className={activeButton === 'fornecedor' ? 'active' : ''}
          onClick={() => handleClick('fornecedor')}
        > <MdOutlineFactory /> Fornecedores</button>
        <a href="#Serviços"> <AiOutlineCar /> Serviços</a>
      </div>
      <div className="sidebar-reports">
        <h2>Relatórios <AiOutlinePlusCircle /> </h2>
        <a href="#EntradaSaida"> <HiOutlineDocumentReport /> Entrada/Saída</a>
        <a href="#SatisfacaoClientes"> <HiOutlineDocumentReport /> Satisfação Cliente</a>
        <a href="#Reclamacoes"> <HiOutlineDocumentReport /> Reclamações</a>
      </div>
      <div className="sidebar-utilities">
        <a href="#Configuracoes"> <IoSettingsOutline />Configurações</a>
        {/*<button onClick={handleLogout}> <IoLogOutOutline /> Sair</button>*/}
        <Link to="/" onClick={handleLogOut}> <IoLogOutOutline /> Sair</Link>
      </div>
    </div>
  );
}

export default Sidebar;
