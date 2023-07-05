import React, { useState } from "react";

import './ClienteModal.css';

function ClienteModal(props) {
  const [formValues, setFormValues] = useState({
    idcliente: "",
    nome: "",
    nomeAbreviado: "",
    cpf: "",
    telefone: "",
    ativo: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleCloseModal = () => {
    props.setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui serão enviados os dados para o backend
    console.log(formValues);
  };

  return (
    <div>

      {props.isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="idcliente">Código:</label>
                <input
                  type="text"
                  id="idcliente"
                  name="idcliente"
                  value={formValues.idcliente}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formValues.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="nomeAbreviado">Nome Abreviado:</label>
                <input
                  type="text"
                  id="nomeAbreviado"
                  name="nomeAbreviado"
                  value={formValues.nomeAbreviado}
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
                  value={formValues.cpf}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={formValues.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="ativo">Ativo:</label>
                <input
                  type="checkbox"
                  id="ativo"
                  name="ativo"
                  checked={formValues.ativo}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClienteModal;