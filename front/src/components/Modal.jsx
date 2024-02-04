import React from 'react';

function Modal({ dados, fecha, titulo, conteudo }) {
  if (!dados) {
    return null;
  }


  return (
    <div className="modal fade show" style={{ display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center'}}  >
      <div className="modal-lg ">
        <div className="modal-content" >
          <div className="modal-header">
            <h2 className="modal-title">{titulo}</h2>
            <button type="button" className="btn-close" onClick={fecha}></button>
          </div>
          <div className="modal-body"  >
            {conteudo}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={fecha}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
