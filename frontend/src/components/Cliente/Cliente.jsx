import React, { useState, useEffect, useContext } from "react";
import './Cliente.css';

import { formatCpf, formatPhoneNumber } from "../../utils/format";
import ClienteModal from "./ClienteModal";
import Modal from "../Modal/Modal";
//import AppContext from "../../context/AppContext";

const clienteService = require('../../services/clienteService');

function Cliente() {

  //const { confirm, setConfirm } = useContext(AppContext)

  const [clientes, setClientes] = useState([]);
  const [clienteModalOpen, setClienteModalOpen] = useState(false);
  const [idCliente, setIdCliente] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [userChoice, setUserChoice] = useState(false);


  useEffect(() => {
    clienteService.fetchClientes().then((response) => {
      setClientes(response);
    });
  }, [clientes]);

  const handleOpenClienteModal = () => {
    setClienteModalOpen(true);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleClickBtnAlterar = (id) => {
    setIdCliente((prevValue) => prevValue = id);

    handleOpenClienteModal();
  }

  const handleClickBtnExcluir = async (id) => {
    setIdCliente((prevValue) => prevValue = id);

    handleOpenModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUserChoice = (choice) => {
    setUserChoice((prevValue) => prevValue = choice);
    handleCloseModal();
    // Fechamento Modal
    
    choice && clienteService.deleteCliente(idCliente)
  };

  const handleResponse = (response) => {
    //setUserChoice((prevValue) => prevValue = response);
    //handleCloseModal();
    // Fechamento Modal
    
    console.log(response)
  };

  const handleClickNovo = () => {
    setIdCliente(null)
    handleOpenClienteModal();
  }
  
  return (
    <>
      <Modal
        
        title={"Excluir Cliente"}
        text={"Tem certeza que quer excluir esse Cliente?"}
        confirmText={"Sim"}
        cancel={true}

        isOpen={modalOpen}
        onClose={handleCloseModal}
        onUserChoice={handleUserChoice}
      />
      <ClienteModal
        isOpen={clienteModalOpen} 
        setIsOpen={setClienteModalOpen}
        idCliente={idCliente}
        onResponse={handleResponse}
      />
    <div className="cliente">
      <div className="cliente-title">
        <h1>Clientes </h1>
        {/*<button onClick={() => clienteService.insertCliente({nome: "Kalvin"})}>Novo</button>*/}
        <button onClick={handleClickNovo}>Novo</button>
      </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Nome Abv.</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Ativo</th>
                    <th>Manutenção</th>
                  </tr>
                </thead>
                <tbody>
                {
                  typeof clientes !== "undefined" && clientes.map((value) => {
                    return (
                      <tr>
                        <td>{value.idcliente}</td>
                        <td>{value.nome}</td>
                        <td>{value.nomeabreviado}</td>
                        <td>{formatCpf(value.cpf)}</td>
                        <td>{formatPhoneNumber(value.telefone)}</td>
                        <td>{value.ativo}</td>
                        <td>
                          <button type="button" onClick={() => {handleClickBtnAlterar(value.idcliente)}}>Alterar</button>
                          <button type="button" onClick={() => {handleClickBtnExcluir(value.idcliente)}}>Excluir</button>
                        </td>
                      </tr>
                    )
                      })
                    }
                </tbody>
              </table>
            </div>
      <nav>
        <ul>
          <li><a href="#Primeira">Primeira</a></li>
          <li><a href="#Anterior">Anterior</a></li>
          <li><a href="#1">1</a></li>
          <li><a href="#2">2</a></li>
          <li><a href="#3">3</a></li>
          <li><a href="#10">10</a></li>
          <li><a href="#Proxima">Próxima</a></li>
          <li><a href="#Ultima">Última</a></li>
        </ul>
      </nav>
    </div>
    </>
  );
}

export default Cliente;
