import React from 'react';

import { BsPeopleFill } from 'react-icons/bs';
import { MdOutlineFactory } from 'react-icons/md';
import { AiOutlineCar } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlinePlusCircle } from "react-icons/ai";

import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar-entities'>
          <a href='#Clientes' id='sidebar_id_clientes'> <BsPeopleFill /> Clientes</a>
          <a href='#Fornecedores'> <MdOutlineFactory /> Fornecedores</a>
          <a href='#Serviços'> <AiOutlineCar /> Serviços</a>
        </div>
        <div className='sidebar-reports'>
          <h2>Relatórios <AiOutlinePlusCircle /> </h2>
          <a href='#EntradaSaida'> <HiOutlineDocumentReport /> Entrada/Saída</a>
          <a href='#SatisfacaoClientes'> <HiOutlineDocumentReport /> Satisfação Cliente</a>
          <a href='#Reclamacoes'> <HiOutlineDocumentReport /> Reclamações</a>
        </div>
        <div className='sidebar-utilities'>
          <a href='#Configuracoes'> <IoSettingsOutline />Configurações</a>
          <a href='#Sair'> <IoLogOutOutline /> Sair</a>
        </div>
    </div>
  );
}

export default Sidebar;