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
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body" style={{ backgroundColor: "#424649", color: "#FFED0E", width: "100%" }}>
                  <h1 className="card-title text-center">{atividade.titulo}</h1>
                  <h7 className="card-title" style={{ maxHeight: "100px", overflowY: "auto" }}>
                    {atividade.descricao}
                  </h7>
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
