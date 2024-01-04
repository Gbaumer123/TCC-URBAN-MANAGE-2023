import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Atividade from '../../components/Atividade';
import { useNavigate } from 'react-router-dom';



const MostraAtividadeTv = () => {


    const [atividadesPendentes, setAtividadesPendentes] = useState([]);

    useEffect(() => {
        const atividadesSalvas = JSON.parse(localStorage.getItem("atividades")) || [];
        const atividadesPendentes = atividadesSalvas.filter(atividade => !atividade.concluida);
        setAtividadesPendentes(atividadesPendentes);
    }, []);

    const navigate = useNavigate();

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
                            <Atividade atividades={atividadesPendentes} />
                        </div>
                    </div>

                    {/* Coluna 2 */}
                    <div className="col-lg-4 mb-4">
                        <div className="card" style={{ backgroundColor: "#E7E8EA" }}>
                            <div className="card-body">
                                <h2 className="card-title">Atividades em Andamento</h2>
                            </div>
                            <Atividade atividades={atividadesPendentes} />
                        </div>
                    </div>

                    {/* Coluna 3 */}
                    <div className="col-lg-4 mb-4">
                        <div className="card" style={{ backgroundColor: "#E7E8EA" }}>
                            <div className="card-body">
                                <h2 className="card-title">Atividades Concluídas</h2>
                            </div>

                            <Atividade atividades={atividadesPendentes} />
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


