import React from 'react';

import { BsPeopleFill } from 'react-icons/bs';
import { MdOutlineFactory } from 'react-icons/md';
import { AiOutlineCar } from "react-icons/ai";

import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
        <a href='#Clientes' id='sidebar_id_clientes'> <BsPeopleFill /> Clientes</a>
        <a href='#Fornecedores'> <MdOutlineFactory /> Fornecedores</a>
        <a href='#Serviços'> <AiOutlineCar /> Serviços</a>
    </div>
  );
}

export default Sidebar;