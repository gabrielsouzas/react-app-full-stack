import React from "react";

import './Modal.css';

function Modal(props) {

    const { title, text, confirm, cancel } = props;

    const handleCloseModal = () => {
        props.setConfirmIsOpen(false);
      };

    return (
        <div>
          {props.confirmIsOpen && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-title">
                  <h3>{title}</h3>
                  <span className="close" onClick={handleCloseModal}>
                    &times;
                  </span>
                </div>
                <div className="modal-text">
                    <p>{text}</p>
                </div>
                <div className="modal-button-container">
                    <button type="submit">{confirm}</button>
                    {cancel && 
                        <button type="button" onClick={handleCloseModal}>Cancelar</button>
                    }
                </div>
              </div>
            </div>
          )}
        </div>
      );
};

export default Modal;