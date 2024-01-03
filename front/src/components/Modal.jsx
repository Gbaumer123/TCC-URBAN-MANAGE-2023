import React from 'react';

function Modal({ dados, fecha, titulo, conteudo }) {
  if (!dados) {
    return null;
  }

  return (
    <div className="modal fade show" style={{ display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center'}}  >
      <div className="modal-lg " style={{  width: '90%'  }}> 
        <div className="modal-content" style={{}}>
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close" onClick={fecha}></button>
          </div>
          <div className="modal-body">
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
