/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import './LoginModal.css';
import { Navigate } from 'react-router-dom';
//import AppContext from "../../context/AppContext";

function Modal({ isOpen, setIsOpen }) {

  const [time, setTime] = useState(10);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    console.log('LogOut');
    // Remover Token da WhiteList

    setIsOpen(false);

  };

  const handleLogin = () => {
    console.log('LogIn');
    //clearInterval(contTime);
  };

  useEffect(() => {
    const contTime = setInterval(() => {
      if (time > 0) {
        setTime(prevValue => prevValue - 1);
      } else {
        clearInterval(contTime);
      }
    }, 1000);

    return () => {
      clearInterval(contTime); // Limpar o intervalo quando o componente for desmontado
    };
  }, [time]);

  // Redirecionar para outra rota quando o contador chegar a zero
  /*if (time === 0 || !isOpen) {
    return <Navigate to="/home" />;
  }*/

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">
              <h3>Expiração de Login</h3>
              <span className="close" onClick={handleCloseModal}>
                    &times;
              </span>
            </div>
            <div className="modal-text">
              <p>{`Seu Login irá expirar em ${time} segundos`}</p>
            </div>
            <div className="modal-button-container">
              <button type="button" onClick={handleLogin}>Continuar</button>
              <button type="button" onClick={handleLogout}>Sair</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  data: propTypes.object
}.isRequired;
