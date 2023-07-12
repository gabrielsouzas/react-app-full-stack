import React from "react";

import './Modal.css';
//import AppContext from "../../context/AppContext";

function Modal({ title, text, confirmText, cancel, isOpen, onClose, onUserChoice }) {

    const handleUserChoice = (choice) => {
        onUserChoice(choice);
        onClose();
      };

    return (
        <div>
          {isOpen && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-title">
                  <h3>{title}</h3>
                  <span className="close" onClick={() => handleUserChoice(false)}>
                    &times;
                  </span>
                </div>
                <div className="modal-text">
                    <p>{text}</p>
                </div>
                <div className="modal-button-container">
                    <button type="button" onClick={() => handleUserChoice(true)}>{confirmText}</button>
                    {cancel && 
                        <button type="button" onClick={() => handleUserChoice(false)}>Cancelar</button>
                    }
                </div>
              </div>
            </div>
          )}
        </div>
      );
};

export default Modal;