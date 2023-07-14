import React, { useState, useEffect, useContext } from "react";
import './Cliente.css';

import { formatCpf, formatPhoneNumber } from "../../utils/format";
import { verifyResponse } from "../../utils/validation";
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
  const [modalContent, setModalContent] = useState({
    title: "Excluir Cliente",
    text: "Tem certeza que quer excluir esse Cliente?",
    confirmText: "Sim",
    cancel: true,
    delete: true,
  });

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

    setModalContent({
      title: "Excluir Cliente",
      text: "Tem certeza que quer excluir esse Cliente?",
      confirmText: "Sim",
      cancel: true,
      delete: true,
    })

    handleOpenModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUserChoice = (choice) => {
    setUserChoice((prevValue) => prevValue = choice);
    handleCloseModal();
    // Fechamento Modal
    
    modalContent.delete && choice && clienteService.deleteCliente(idCliente);
  };

  const handleResponse = (response) => {
    //setUserChoice((prevValue) => prevValue = response);
    //handleCloseModal();
    // Fechamento Modal
    
    
    const modalText = response.status === 201 ? "Cliente inserido com sucesso!" :
                      response.status === 204 ? "Cliente alterado com sucesso!" :
                      response.status === 200 ? "Cliente excluído com sucesso!" :
                      response.status >= 400 && response.status < 500 ? "Erro na solicitação do cliente! Consulte o administrador do sistema." :
                      response.status >= 500 ? "Erro na resposta do servidor! Consulte o administrador do sistema." : "Resposta desconhecida, verifique se os dados foram salvos e consulte o administrador do sistema.";
    setModalContent({
      title: "Resposta operação",
      text: modalText,
      confirmText: "OK",
      cancel: false,
      delete: false,
    })

    handleOpenModal();
  };

  const handleClickNovo = () => {
    setIdCliente(null)
    handleOpenClienteModal();
  }
  
  return (
    <>
      <Modal
        
        title={modalContent.title}
        text={modalContent.text}
        confirmText={modalContent.confirmText}
        cancel={modalContent.cancel}

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
