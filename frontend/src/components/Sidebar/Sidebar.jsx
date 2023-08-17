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
import { deleteWhitelist } from '../../services/whitelistService';

function Sidebar() {

  const [activeButton, setActiveButton] = useState('cliente');

  const { setEntitySelected } = useContext(AppContext);

  const handleClick = (entity) => {
    setActiveButton(entity);
    setEntitySelected(entity);
  };


  const handleLogOut = () => {
    // Remover o Token da WhiteList
    removeTokenWhiteList();

    // Remover o Token da sessão
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('currentUser');
  };

  const removeTokenWhiteList = async () => {
    try {
      const response = await deleteWhitelist(sessionStorage.getItem('authToken'));
      if (response.ok) {
        const data = await response.json();
        if (data.status != 200) {
          console.log(`Erro ao remover Token da WhiteList. Erro: ${data.message}`);
        }
      } else console.log(`Erro ao remover Token da WhiteList. Erro: ${response}`);
    } catch (error) {
      console.log(error);
    }
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
