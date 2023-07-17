import React, { useState, useEffect } from "react";
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

  // Modal useStates
  const [modalOpen, setModalOpen] = useState(false);
  //const [userChoice, setUserChoice] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "Excluir Cliente",
    text: "Tem certeza que quer excluir esse Cliente?",
    confirmText: "Sim",
    cancel: true,
    delete: true,
  });

  // Table useStates
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [totalPages, setTotalPages] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  
  const [searchTerm, setSearchTerm] = useState('');
  //const [filteredData, setFilteredData] = useState(clientes);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtrar os dados com base no critério de pesquisa
    const filteredData = clientes.filter(item => {
      return item.nome.toLowerCase().includes(searchTerm.toLowerCase());
      //|| item.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    //console.log(filteredData)
    //setFilteredData(filteredData);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentData(filteredData.slice(startIndex, endIndex));
    //setCurrentData(filteredData);
    setCurrentPage(1); // Redefinir a página atual ao pesquisar
  };

  useEffect(() => {
    clienteService.fetchClientes().then((response) => {
      setClientes(response);
      setTotalPages(Math.ceil(response.length / itemsPerPage));
      setCurrentData(response.slice(startIndex, endIndex));
    });
  }, [endIndex, startIndex]); //clientes, endIndex, startIndex

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
    //setUserChoice((prevValue) => prevValue = choice);
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
    setIdCliente((prevValue) => prevValue = null)
    handleOpenClienteModal();
  }

  // Table pagination

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPages);
  };
  
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
    <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Pesquisar por nome ou email"
      />
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
                  //typeof clientes !== "undefined" && clientes.map((value) => {
                    typeof currentData !== "undefined" && currentData.map((value) => {
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
      <div className="cliente-pagination">
        <div className="cliente-pagination-content">
        <button onClick={firstPage} disabled={currentPage === 1}>Primeira</button>
        <button onClick={previousPage} disabled={currentPage === 1}>Anterior</button>
        {currentPage !== 1 && (
          <button onClick={previousPage}>{currentPage - 1}</button>
          )
        }
        <button className="current-page">{currentPage}</button>
        {currentPage !== totalPages && (
          <button className="next-button" onClick={nextPage}>{currentPage + 1}</button>
          )
        }
        <button onClick={nextPage} disabled={currentPage === totalPages}>Próxima</button>
        <button onClick={lastPage} disabled={currentPage === totalPages}>Última</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Cliente;
