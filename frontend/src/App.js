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
              <h1>{value.idclientes}</h1>
              <p>{value.nome}</p>
            </div>
          )
        })
      }
      
    </div>
  );
}

export default App;
