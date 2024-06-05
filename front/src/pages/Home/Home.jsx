import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '../../components/Header/Cabecalho';
import Atividade from '../../components/Atividade';
import apiAtividades from '../../services/apiAtividades/apiAtividades';

const Home = () => {
  
  const [atividadesPendentes, setAtividadesPendentes] = useState([]);
  const [atividadesEmAndamento, setAtividadesEmAndamento] = useState([]);
  const [atividadesConcluidas, setAtividadesConcluidas] = useState([]);

  useEffect(() => {
    carregarAtividades();
  }, []);

  const carregarAtividades = async () => {
    try {
      const dados = await apiAtividades.listarAtividades();
      setAtividadesPendentes(dados.filter(atividade => atividade.status === "pendente"));
      setAtividadesEmAndamento(dados.filter(atividade => atividade.status === "em andamento"));
      setAtividadesConcluidas(dados.filter(atividade => atividade.status === "concluida"));
    } catch (error) {
      console.error('Erro ao carregar as atividades:', error.message);
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="container-fluid mt-2 text-center">
        <div className="row">
          {/* Coluna 1: Atividades Pendentes */}
          <div className="col-lg-4 mb-4">
            <div className="card" style={{ backgroundColor: "#E7E8EA" }}>
              <div className="card-body">
                <h2 className="card-title">Atividades Pendentes</h2>
                <Atividade atividades={atividadesPendentes} />
              </div>
            </div>
          </div>

          {/* Coluna 2: Atividades em Andamento */}
          <div className="col-lg-4 mb-4">
            <div className="card" style={{ backgroundColor: "#E7E8EA" }}>
              <div className="card-body">
                <h2 className="card-title">Atividades em Andamento</h2>
           
              </div>
            </div>
          </div>

          {/* Coluna 3: Atividades Concluídas */}
          <div className="col-lg-4 mb-4">
            <div className="card" style={{ backgroundColor: "#E7E8EA" }}>
              <div className="card-body">
                <h2 className="card-title">Atividades Concluídas</h2>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
