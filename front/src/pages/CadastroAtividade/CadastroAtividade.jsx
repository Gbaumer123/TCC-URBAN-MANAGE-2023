import React, { useState, useEffect } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import "./CadastroAtividade.css";

function CadastroAtividade() {

    /* const [funcionarios, setFuncionarios] = useState([]);
     const [maquinas, setMaquinas] = useState([]);
 
     function carregarFuncionarios() {
         const funcionariosSalvos = localStorage.getItem("funcionarios");
         if (funcionariosSalvos) {
             const funcionariosObj = JSON.parse(funcionariosSalvos);
             setFuncionarios(funcionariosObj);
         }
     }
 
     function carregarMaquina() {
         const maquinasSalvas = localStorage.getItem("maquinas");
         if (maquinasSalvas) {
             const maquinaObj = JSON.parse(maquinasSalvas);
             setMaquinas(maquinaObj);
         }
     }
 
     useEffect(() => {
         carregarFuncionarios();
         carregarMaquina();
     }, []);*/

    const [formState, setFormState] = useState({
        titulo: "",
        equipe: "",
        funcionario: "",
        veiculo: "",
        descricao: "",
    });

    // Define a função para atualizar o estado do formulário
    const mudaFormState = (evento, campo) => {
        setFormState({ ...formState, [campo]: evento.target.value });
    };

    const CriaAtividade = (evento) => {
        evento.preventDefault();

        // Cria um novo objeto de atividade
        const novaAtividade = {
            id: Date.now(),
            titulo: formState.titulo,
            funcionario: formState.funcionario,
            maquina: formState.maquina,
            descricao: formState.descricao,
        };

        // Recupera o array de atividades do localStorage ou cria um novo array vazio
        const atividades = JSON.parse(localStorage.getItem("atividades")) || [];

        // Adiciona a nova atividade no array
        atividades.push(novaAtividade);

        // Salva o array atualizado no localStorage
        localStorage.setItem("atividades", JSON.stringify(atividades));

        // Exibe as informações da nova atividade no console
        console.log(novaAtividade);

        setFormState({
            titulo: "",
            funcionario: "",
            maquina: "",
            descricao: "",
        })
    };

    const [veiculos, setVeiculos] = useState([]);



    useEffect(() => {
        // Verificar se existem máquinas salvas no localStorage
        const veiculosSalvos = localStorage.getItem("veiculos");
        if (veiculosSalvos) {
            setVeiculos(JSON.parse(veiculosSalvos));
        }
    }, []);


    return (
        <>
            <Cabecalho />
            <main >
           
                <section className="lateral7">
                <Textomaior texto="ADICIONE UMA NOVA ATIVIDADE" corTexto="black" />
                    <form method="POST" className='formularioAtiv'>

                        <Input
                            tipo="name"
                            placeholder="Titulo da atividade"
                            valor={formState.titulo}
                            onChange={(evento) => mudaFormState(evento, "titulo")}
                        />

                        <select class="select" value={formState.campo}
                            onChange={(evento) => mudaFormState(evento, "equipe")}>
                            <option selected >Equipes</option>
                            <option value="1">Rodoviário</option>
                            <option value="2">Obras</option>
                        </select>

                     
                        <select class="select" value={formState.campo}
                            onChange={(evento) => mudaFormState(evento, "equipe")}>
                            <option selected >Funcionários</option>
                            <option value="1">Gabriel</option>
                            <option value="2">Stephany</option>
                        </select>

                        <select class="select" value={formState.campo}
                            onChange={(evento) => mudaFormState(evento, "equipe")}>
                            <option selected >Veículos</option>
                            <option value="1">Patrola</option>
                            <option value="2">Retroescavadeira</option>
                        </select>

                        <textarea
                            className="textArea"
                            rows="3"  // Ajuste a altura conforme necessário
                            placeholder="Descrição da atividade"
                            value={formState.descricao}
                            onChange={(evento) => mudaFormState(evento, "descricao")}
                        ></textarea>

                        <Botao onClick={CriaAtividade} texto="CRIAR ATIVIDADE" corTexto="white" />
                    </form>
                </section >
           

                <section className='lateral8'>
                    <div className="table-responsive">
                        <h3 className="mb-2 text-center ">Atividades Cadastradas</h3>
                        {veiculos.map((veiculo) => (
                            <div key={veiculo.id}>
                                <h4 className='mb-2 text-center'>{veiculo.nomeVeiculo}</h4>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Equipe</th>
                                            <th scope="col">Funcionário</th>
                                            <th scope="col">Veiculo</th>
                                            <th scope="col">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {veiculos.map((veiculo) => (
                                            <tr key={veiculo.id} style={{ backgroundColor: 'white' }}>
                                                <td>{veiculo.nomeVeiculo}</td>
                                                <td>{veiculo.placa}</td>
                                                <td>{veiculo.nomeVeiculo}</td>

                                                <td>
                                                    <button className="btn btn-warning me-2">Editar</button>
                                                    <button className="btn btn-danger">Excluir</button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default CadastroAtividade;