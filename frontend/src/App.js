import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [clientes, setClientes] = useState();

  /*useEffect(()=>{
    Axios.get("http://localhost:3333/clientes").then((response)=>{
      setClientes(response.data);
      //console.log(response.data);
    });
  })*/

  useEffect(() => {
    fetchClientes().then((response) => {
      //console.log(response)
      setClientes(response);
    });
  });

  const fetchClientes = async () => {
    const response = await fetch('http://localhost:3333/clientes');
    const clientesList = await response.json();
    //console.log(clientesList);
    return clientesList;

}
  
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
