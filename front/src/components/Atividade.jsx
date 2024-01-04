import React, { useState } from "react";
import './Atividade.css'
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";

function Atividade({ atividades }) {

  const navigate = useNavigate()

  const [dados, setDados] = useState(false);
  const [descricaoExibicao, setDescricaoExibicao] = useState('');


  const abreAtividade = () => {
    setDados(true);
    setDescricaoExibicao('');
  }

  const fechaAtividade = () => setDados(false);




//descrição so pode ter 600 caracteres


  return (
    <>

      <table className="table">
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
                    {descricaoExibicao ||
                        (atividade.descricao.length > 100
                          ? `${atividade.descricao.slice(0, 100)}...` //SLICE FAZ A COPIA DOS 100 PRIMEIROS CARACTERES
                          : atividade.descricao)}
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
        titulo="SUA ATIVIDADE:"
        conteudo={
       
            <div className="row justify-content-center">
              {atividades.map(atividade => (
                <div key={atividade.id} className="col-lg-12">
                  <div className="cssModalBody">
                    <h1 className="cssModalTitle">{atividade.titulo}</h1>

                    <div className="cssModalText">
                      <p >FUNCIONÁRIOS: {atividade.funcionario}</p>
                      <p >VEÍCULOS: {atividade.veiculo}</p>
                      <p >EQUIPE: {atividade.equipe}</p>
                      <p >DESCRIÇÃO: {atividade.descricao}</p> 
                    </div>

                    <div className="d-flex justify-content-center">
                      <button className="btn btn-info me-3">Iniciar Atividade</button>
                      <button className="btn btn-warning me-3 ">Editar Atividade</button>
                      <button className="btn btn-danger">Excluir Atividade</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        
        }
      />

    </>

  );
}

export default Atividade;
