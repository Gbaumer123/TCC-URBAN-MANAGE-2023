import React, { useState, useEffect } from "react";
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import { useNavigate } from "react-router-dom";


function Veiculos() {
    const navigate = useNavigate();
    const [maquinas, setMaquinas] = useState([]);

    const CadastraMaquina = (evento) => {
        evento.preventDefault();
        navigate('/CadastroMaquina')
    }

    useEffect(() => {
        // Verificar se existem máquinas salvas no localStorage
        const maquinasSalvas = localStorage.getItem("maquinas");
        if (maquinasSalvas) {
            setMaquinas(JSON.parse(maquinasSalvas));
        }
    }, []);

   

    return (
        <>
            <Cabecalho />
            <div className="container-fluid border rounded p-3 text-center text-uppercase">
                <div className="row">
                    <div className="col">
                        <h2>Veículos</h2>
                    </div>
                </div>
            </div>
            <br />
            <div className="container-fluid border rounded p-2 text-center">
                <div className="row">
                    <div className=" col d-flex justify-content-between">
                        <div>
                            <Botao onClick={CadastraMaquina} texto="Nova Máquina" corTexto="white" />
                        </div>
                        <div>
                            <Botao onClick={CadastraMaquina} texto="Editar Máquina" corTexto="white" />
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h3>Máquinas Cadastradas</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nome da máquina</th>
                                    <th>Placa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {maquinas.map((maquina) => (
                                    <tr key={maquina.id}>
                                        <td>{maquina.nomeMaquina}</td>
                                        <td>{maquina.placa}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>

    )

}

export default Veiculos;