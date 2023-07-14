import React, { useEffect, useState } from "react";
import clienteService from "../../services/clienteService"

import { formatCPFInput, formatPhoneNumberInput } from "../../utils/format";

import './ClienteModal.css';

function ClienteModal(props) {

  const { onResponse } = props;

  const [idCliente, setIdCliente] = useState(0);
  const [nome, setNome] = useState("");
  const [nomeAbreviado, setNomeAbreviado] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ativo, setAtivo] = useState("Sim");
  
  //const [cliente, setCliente] = useState([]);

  const cleanCliente = () => {
    setIdCliente("");
    setNome("");
    setNomeAbreviado("");
    setCPF("");
    setTelefone("");
    setAtivo("Sim");
  }

  const handleCloseModal = () => {
    props.setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.idCliente ? handleUpdateCliente() : handleInsertCliente();
  };

  const handleInsertCliente = () => {
    clienteService.insertCliente({
      nome,
      nomeabreviado: nomeAbreviado,
      cpf,
      telefone,
      ativo,
    }).then((response)=>{
      //response.status === 201 ? alert("Cliente inserido com sucesso!") : alert("Erro ao inserir Cliente.");
      onResponse(response);
      cleanCliente();
      handleCloseModal();
    });
  }

  const handleUpdateCliente = () => {
    clienteService.updateCliente({
      idcliente: idCliente,
      nome,
      nomeabreviado: nomeAbreviado,
      cpf,
      telefone,
      ativo,
    }).then((response)=>{
      //response.status === 204 ? alert("Cliente atualizado com sucesso!") : alert("Erro ao atualizar Cliente.");
      onResponse(response);
      cleanCliente();
      handleCloseModal();
    });
  }

  const handleCPFChange = (e) => {
    const { value } = e.target;
    // Remove qualquer caractere que não seja dígito
    const cleanedValue = value.replace(/\D/g, "");
    // Aplica a formatação do CPF
    const formattedValue =  formatCPFInput(cleanedValue);
    setCPF(formattedValue);
  };

  const handleTelefoneChange = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/\D/g, "");
    const formattedValue =  formatPhoneNumberInput(cleanedValue);
    setTelefone(formattedValue);
  };

  useEffect(() => {
      props.idCliente
      ? clienteService.fetchClienteById(props.idCliente).then((response) => {
        const [ data ] = response;
        const { idcliente, nome, nomeabreviado, cpf, telefone, ativo } = data;
        //setCliente(data);
        setIdCliente(idcliente);
        setNome(nome);
        setNomeAbreviado(nomeabreviado);
        setCPF(cpf);
        setTelefone(telefone);
        setAtivo(ativo);
      })
      : cleanCliente();
  }, [props.idCliente]);

  return (
    <div>
      {props.isOpen && (
        <div className="cliente-modal">
          <div className="cliente-modal-content">
            <div className="cliente-modal-title">
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
                  placeholder="ID (Auto-incremento)"
                  value={idCliente}
                  onChange={(e) => setIdCliente(e.target.value)}
                  disabled={true}
                />
              </div>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite o nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="nomeAbreviado">Nome Abreviado:</label>
                <input
                  type="text"
                  id="nomeAbreviado"
                  name="nomeAbreviado"
                  placeholder="Digite o primeiro nome"
                  value={nomeAbreviado}
                  onChange={(e) => setNomeAbreviado(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formatCPFInput(cpf)}
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
                  placeholder="Digite o telefone (Apenas números)"
                  value={formatPhoneNumberInput(telefone)}
                  onChange={handleTelefoneChange}
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
                    onChange={(e) => setAtivo(e.target.value)}>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                  </select>
                </div>
              </div>
              <div className="cliente-modal-button-container">
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