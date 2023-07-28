import React, { useState, useEffect } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Texto from '../../components/Texto';

function CadastroAtividade() {

    const [funcionarios, setFuncionarios] = useState([]);
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
    }, []);

    const [formState, setFormState] = useState({
        titulo: "",
        funcionario: "",
        maquina: "",
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


    return (
        <>
            <Cabecalho />
            <section className="d-flex justify-content-center align-items-center h-100">
                <div className="form">
                    <Texto texto="Adicione uma nova atividade" corTexto="black" />
                    <br />
                    <form method="POST" className="text-center" onSubmit={CriaAtividade}>
                        <Input
                            tipo="name"
                            placeholder="Titulo da atividade"
                            valor={formState.titulo}
                            onChange={(evento) => mudaFormState(evento, "titulo")}
                        />
                        <br></br>
                        <select
                            value={formState.funcionario}
                            onChange={(evento) => mudaFormState(evento, "funcionario")}
                            className="form-select"
                        >
                            <option value="">Selecione um funcionário</option>
                            {funcionarios && funcionarios.map(funcionario => (
                                <option key={funcionario.id} value={funcionario.nome}>
                                    {funcionario.nome}
                                </option>
                            ))}

                        </select>
                        <br></br>
                        <select
                            value={formState.maquina}
                            onChange={(evento) => mudaFormState(evento, "maquina")}
                            className="form-select"
                        >
                            <option value="">Selecione uma máquina</option>
                            {maquinas && maquinas.map(maquina => (
                                <option key={maquina.id} value={maquina.nomeMaquina}>
                                    {maquina.nomeMaquina}
                                </option>
                            ))}
                        </select>

                        <br></br>

                        <textarea
                            className="form-control"
                            type="text"
                            placeholder="Descrição da atividade"
                            value={formState.descricao}
                            onChange={(evento) => mudaFormState(evento, "descricao")}
                        />
                        <br></br>

                        <Botao onClick={CriaAtividade} texto="Criar atividade" corTexto="white" />
                    </form>
                </div>
            </section>

        </>
    );
}

export default CadastroAtividade;