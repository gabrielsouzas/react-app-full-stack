import React, { useEffect, useState } from "react";
import clienteService from "../../services/clienteService"

import './ClienteModal.css';

function ClienteModal(props) {
  /*const [formValues, setFormValues] = useState({
    idcliente: "",
    nome: "",
    nomeAbreviado: "",
    cpf: "",
    telefone: "",
    ativo: "",
  });*/

  const [idCliente, setIdCliente] = useState();
  const [nome, setNome] = useState();
  const [nomeAbreviado, setNomeAbreviado] = useState();
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState();
  const [ativo, setAtivo] = useState();
  

  const [cliente, setCliente] = useState([]);

  /*const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };*/

  const handleCloseModal = () => {
    props.setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui serão enviados os dados para o backend
    //console.log(formValues);
  };

  const handleCPFChange = (e) => {
    const { value } = e.target;

    // Remove qualquer caractere que não seja dígito
    const cleanedValue = value.replace(/\D/g, "");

    // Aplica a formatação do CPF
    const formattedValue = formatCPF(cleanedValue);

    setCPF(formattedValue);
  };

  const formatCPF = (value) => {
    // Remove a formatação atual do CPF
    const unformattedValue = value ? value.replace(/[.-]/g, "") : "";

    // Aplica a nova formatação do CPF
    const parts = unformattedValue.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    
    const formattedCPF = !parts[2]
      ? parts[1]
      : `${parts[1]}.${parts[2]}${parts[3] ? `.${parts[3]}` : ""}${parts[4] ? `-${parts[4]}` : ""}`;

    return formattedCPF;
  };

  useEffect(() => {
      props.idCliente && 
      clienteService.fetchClienteById(props.idCliente).then((response) => {
        const [ data ] = response;
        const { idcliente, nome, nomeabreviado, cpf, telefone, ativo } = data;
        //setCliente(data);
        setIdCliente(idcliente);
        setNome(nome);
        setNomeAbreviado(nomeabreviado);
        setCPF(cpf);
        setTelefone(telefone);
        setAtivo(ativo);
      });
  }, [props.idCliente]);

  const handleChange = (value) => {
    /* Pega os valores anteriores e adiciona os novos */
    /*setCliente(prevValue=>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));*/
  }

  return (
    <div>
      {props.isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">
              <h3>Cadastrar/Alterar Cliente</h3>
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="idcliente">Código:</label>
                <input
                  type="text"
                  id="idcliente"
                  name="idcliente"
                  value={idCliente}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={nome}
                  required
                />
              </div>
              <div>
                <label htmlFor="nomeAbreviado">Nome Abreviado:</label>
                <input
                  type="text"
                  id="nomeAbreviado"
                  name="nomeAbreviado"
                  value={nomeAbreviado}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formatCPF(cpf)}
                  onChange={handleCPFChange}
                  placeholder="Digite o CPF"
                  maxLength={14}
                  required
                />
              </div>
              <div>
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="ativo">Ativo:</label>
                <div>
                  <select
                    id="ativo"
                    name="ativo"
                    value={ativo}
                    onChange={handleChange}>
                      <option value="SIM">Sim</option>
                      <option value="NAO">Não</option>
                  </select>
                </div>
              </div>
              <div className="modal-button-container">
                <button type="submit">Salvar</button>
                <button type="button" onClick={handleCloseModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClienteModal;