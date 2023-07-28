import React, {useState, useEffect} from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import { useNavigate } from 'react-router-dom';


function Equipes() {
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState([]);

    const CadastraFuncionario = (evento) => {
        evento.preventDefault();
        navigate ('/CadastroFuncionario')
    }

     useEffect(() => {
        // Verificar se existem máquinas salvas no localStorage
        const funcionariosSalvos = localStorage.getItem("funcionarios");
        if (funcionariosSalvos) {
            setFuncionarios(JSON.parse(funcionariosSalvos));
        }
    }, []);

    return (
        <>
            <Cabecalho />
            <div className="container-fluid border rounded p-3 text-center text-uppercase">
                <div className="row">
                    <div className="col">
                        <h2>Equipes</h2>
                    </div>
                </div>
            </div>
            <br />
            <div className="container-fluid border rounded p-2 text-center">
                <div className="row">
                    <div className=" col d-flex justify-content-between">
                        <div>
                            <Botao onClick={CadastraFuncionario} texto="Novo Funcionário" corTexto="white" />
                            <Botao onClick={CadastraFuncionario} texto="Nova Equipe" corTexto="white" />
                        </div>
                        <div>
                            <Botao onClick={CadastraFuncionario} texto="Editar Funcionário" corTexto="white" />
                            <Botao onClick={CadastraFuncionario} texto="Editar Equipe" corTexto="white" />
                        </div>
                    </div>
                </div>
            </div>
            <br/> 
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h3>Funcionários Cadastrados</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nome do funcionário</th>
                                    <th>Cargo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {funcionarios.map((funcionario) => (
                                    <tr key={funcionario.id}>
                                        <td>{funcionario.nome}</td>
                                        <td>{funcionario.cargo}</td>
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
export default Equipes

