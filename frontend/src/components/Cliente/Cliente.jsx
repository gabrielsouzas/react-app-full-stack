import React, { useState, useEffect } from "react";
import './Cliente.css';

const clienteService = require('../../services/clienteService');

function Cliente() {

  const [clientes, setClientes] = useState();

  useEffect(() => {
    clienteService.fetchClientes().then((response) => {
      setClientes(response);
    });
  });
  
  return (
    <div className="cliente">
      <div className="cliente-title">
        <h1>Clientes</h1>
        <button onClick={() => clienteService.insertCliente({nome: "Kalvin"})}>Novo</button>
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
                        <td>{value.cpf}</td>
                        <td>{value.telefone}</td>
                        <td>{value.ativo}</td>
                        <td>
                          <button>Alterar</button>
                          <button>Excluir</button>
                        </td>
                      </tr>
                    )
                      })
                    }
                </tbody>
              </table>
            </div>
      
    </div>
  );
}

export default Cliente;
