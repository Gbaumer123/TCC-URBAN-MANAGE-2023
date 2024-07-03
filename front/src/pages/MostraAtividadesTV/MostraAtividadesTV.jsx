import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AtividadeTV from '../../components/AtividadeTV';
import { useNavigate } from 'react-router-dom';
import apiAtividades from '../../services/apiAtividades/apiAtividades';
import "./MostraAtividadesTV.css";


const MostraAtividadeTv = () => {
    const navigate = useNavigate();

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
            <div className="container-fluid mt-2 text-center">
                <div className="row">
                    {/* Coluna 1 */}
                    <div className="col-lg-4 mb-4" >
                        <div className="card" style={{ backgroundColor: "#E7E8EA" }}>
                            <div className="card-body">
                                <h2 className="card-title">Atividades Pendentes</h2>
                            </div>
                            <AtividadeTV atividades={atividadesPendentes} />
                        </div>
                    </div>

                    {/* Coluna 2 */}
                    <div className="col-lg-4 mb-4">
                        <div className="card" style={{ backgroundColor: "#E7E8EA" }}>
                            <div className="card-body">
                                <h2 className="card-title">Atividades em Andamento</h2>
                            </div>
                 
                        </div>
                    </div>

                    {/* Coluna 3 */}
                    <div className="col-lg-4 mb-4">
                        <div className="card" style={{ backgroundColor: "#E7E8EA" }}>
                            <div className="card-body">
                                <h2 className="card-title">Atividades Concluídas</h2>
                            </div>

            
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/home')}>Fechar </button>
                </div>
            </div>

        </>
    );
};


export default MostraAtividadeTv


