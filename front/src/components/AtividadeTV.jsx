import React, { useState,useEffect } from "react";
import './Atividade.css'
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";
import apiAtividades from '..//services/apiAtividades/apiAtividades';

function AtividadeTV() {

  const navigate = useNavigate()

  const [atividades, setAtividades] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);


  const abreAtividade = (atividade) => {
    setAtividadeSelecionada(atividade); // Define a atividade selecionada
    setModalAberto(true); // Abre o modal
  }

  const fechaAtividade = () => {
    setModalAberto(false);
    setAtividadeSelecionada(null); // Limpa a atividade selecionada ao fechar o modal
  }

  useEffect(() => {
    carregarAtividades();
  }, []);

  const carregarAtividades = async () => {
    try {
      const dados = await apiAtividades.listarAtividades();
      setAtividades(dados);
    } catch (error) {
      console.error('Erro ao carregar atividades:', error.message);
    }
  };


  const excluirAtividade = async (id) => {
    try {
      await apiAtividades.excluirAtividade(id);
      const novaLista = atividades.filter((atividade) => atividade.id !== id);
      setAtividades(novaLista);
      fechaAtividade();
    } catch (error) {
      console.error('Erro ao excluir a atividade:', error.message);
    }
  };

  return (
    <>
      <table className="table">
        <tbody>
          {atividades.map(atividade => (
            <tr key={atividade.id}>
              <td>
                <div className="card cssCard" onClick={() => abreAtividade(atividade)}>
                  <div className="card-body cssCardBody">
                    <h1 className="card-title cssCardTitle">{atividade.titulo}</h1>
                    <p className="card-text cssCardText">
                      {atividade.descricao.length > 100
                        ? `${atividade.descricao.slice(0, 300)}...` // Mostra os primeiros 100 caracteres
                        : atividade.descricao}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAberto && atividadeSelecionada && (
        <Modal
          dados={modalAberto}
          fecha={fechaAtividade}
          titulo="SUA ATIVIDADE:"
          conteudo={
            <div className="cssModalBody">
              <h1 className="cssModalTitle">{atividadeSelecionada.titulo}</h1>
              <p>EQUIPE: {atividadeSelecionada.equipe}</p>
              <p>FUNCIONÁRIOS: {atividadeSelecionada.funcionarios}</p>
              <p>VEÍCULOS: {atividadeSelecionada.veiculo}</p>
              <p>DESCRIÇÃO: <div dangerouslySetInnerHTML={{ __html: atividadeSelecionada.descricao }} /></p>
              <div className="d-flex justify-content-center cssButton">
                <button className="btn btn-info me-3">Iniciar Atividade</button>
                <button className="btn btn-warning me-3">Editar Atividade</button>
                <button className="btn btn-danger" onClick={() => excluirAtividade(atividadeSelecionada.id)}>Excluir Atividade</button>

              </div>
            </div>
          }
        />
      )}
      

      {modalAberto && atividadeSelecionada && (
        <Modal
          dados={modalAberto}
          fecha={fechaAtividade}
          titulo="SUA ATIVIDADE:"
          conteudo={
            <div className="cssModalBody">
              <h1 className="cssModalTitle">{atividadeSelecionada.titulo}</h1>
              <p>EQUIPE: {atividadeSelecionada.equipe}</p>
              <p>FUNCIONÁRIOS: {atividadeSelecionada.funcionarios}</p>
              <p>VEÍCULOS: {atividadeSelecionada.veiculo}</p>
              <p>DESCRIÇÃO: <div dangerouslySetInnerHTML={{ __html: atividadeSelecionada.descricao }} /></p>
              <div className="d-flex justify-content-center cssButton">
                <button className="btn btn-success me-3">Iniciar Atividade</button>
                <button className="btn btn-secondary me-3">Editar Atividade</button>
                <button className="btn btn-danger" onClick={() => excluirAtividade(atividadeSelecionada.id)}>Excluir Atividade</button>

              </div>
            </div>
          }
        />
      )}
      

    </>

  );
}

export default AtividadeTV;
