import React from 'react';

function Atividade({ atividades }) {
  return (
    <table className="table">
    <thead>
    </thead>
    <tbody>
      {atividades.map(atividade => (
        <tr key={atividade.id}>
          <td>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">{atividade.titulo}</h5>
                <p className="card-text">{atividade.funcionario}</p>  
                <p className="card-text">{atividade.maquina}</p>
                <h6 className="card-title">{atividade.descricao}</h6>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
}

export default Atividade;
