import React, { useState, useEffect } from "react";
import './Cliente.css';

import { formatCpf, formatPhoneNumber } from "../../utils/format";
import ClienteModal from "./ClienteModal";

const clienteService = require('../../services/clienteService');

function Cliente() {

  const [clientes, setClientes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idCliente, setIdCliente] = useState();

  useEffect(() => {
    clienteService.fetchClientes().then((response) => {
      setClientes(response);
    });
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleClickBtnAlterar = (id) => {
    setIdCliente((prevValue) => prevValue = id);

    handleOpenModal();
  }

  const handleClickNovo = () => {
    setIdCliente(null)
    handleOpenModal();
  }
  
  return (
    <>
      <ClienteModal
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        idCliente={idCliente}
      />
    <div className="cliente">
      <div className="cliente-title">
        <h1>Clientes</h1>
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
                          <button type="button" onClick={() => clienteService.deleteCliente(value.idcliente)}>Excluir</button>
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
