import React, { useState, useEffect } from "react";
import './App.css';

const clienteService = require('./services/clienteService');

function App() {

  const [clientes, setClientes] = useState();

  useEffect(() => {
    clienteService.fetchClientes().then((response) => {
      setClientes(response);
    });
  });
  
  return (
    <div>
      {
        typeof clientes !== "undefined" && clientes.map((value) => {
          return (
            <div>
              <h1>{value.idcliente}</h1>
              <p>{value.nome}</p>
              <p>{value.nomeabreviado}</p>
              <p>{value.cpf}</p>
              <p>{value.telefone}</p>
              <p>{value.ativo}</p>
            </div>
          )
        })
      }
      <button onClick={() => clienteService.insertCliente({nome: "Kalvin"})}>Cadastrar</button>
    </div>
  );
}

export default App;
