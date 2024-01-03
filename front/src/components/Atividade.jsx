import React, { useState } from "react";
import './Atividade.css'
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";

function Atividade({ atividades }) {

  const navigate = useNavigate()

  const [dados, setDados] = useState(false);

  const abreAtividade = () => setDados(true);
  const fechaAtividade = () => setDados(false);

  return (
    <><table className="table">
      <thead>
      </thead>
      <tbody>
        {atividades.map(atividade => (
          <tr key={atividade.id}>
            <td>
              <div className="card cssCard">
                <div className="card-body cssCardBody">
                  <h1 className="card-title  cssCardTitle">{atividade.titulo}</h1>
                  <h7 className="card-text cssCardText">
                    {atividade.descricao}
                  </h7>

                </div>
                <button className="btn btn-info fw-bold " onClick={abreAtividade}>VISUALIZAR ATIVIDADE</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

    </table>

      <Modal
        dados={dados}
        fecha={fechaAtividade}
        titulo="Sua Atividade"
        conteudo={<tbody>
          {atividades.map(atividade => (
            <tr key={atividade.id}>
              <td>
                <div className="card cssCard">
                  <div className="card-body cssCardBody">
                    <h1 className="card-title  cssCardTitle">{atividade.titulo}</h1>
                    
                    <h7 className="card-text cssCardText">
                      {atividade.funcionario}
                    </h7>
                    <h7 className="card-text cssCardText">
                      {atividade.veiculo}
                    </h7>
                    <h7 className="card-text cssCardText">
                      {atividade.equipe}
                    </h7>
                    <h7 className="card-text cssCardText">
                      {atividade.descricao}
                    </h7>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>}

      />

    </>

  );
}

export default Atividade;
