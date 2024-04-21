import React, { useState } from 'react';
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import "./CadastroAtividade.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CadastroAtividade() {
    const [formState, setFormState] = useState({
        titulo: "",
        veiculo: "",
        descricao: "",
        tipoAlocacao: "",
        equipe: "",
        funcionarios: [],
    });

    const funcionariosDisponiveis = [
        { id: '1', nome: "Funcionário 1" },
        { id: '2', nome: "Funcionário 2" },
        { id: '3', nome: "Funcionário 3" }
    ];

    const mudaFormstate = (evento, chave) => {
        setFormState({
            ...formState,
            [chave]: evento.target.value
        });
    };

    const mudaFormstateFuncionario = (index, value) => {
        const updatedFuncionarios = formState.funcionarios.map((func, idx) =>
            idx === index ? { ...func, id: value } : func);
        setFormState(prevState => ({ ...prevState, funcionarios: updatedFuncionarios }));
    };

    const addFuncionario = () => {
        setFormState(prevState => ({
            ...prevState,
            funcionarios: [...prevState.funcionarios, { id: '', nome: '' }]
        }));
    };

    const removeFuncionario = (index) => {
        setFormState(prevState => ({
            ...prevState,
            funcionarios: prevState.funcionarios.filter((_, idx) => idx !== index)
        }));
    };

    const selectFuncionarios = () => (
        <div>
            <Textomenor texto="Funcionários disponíveis:" />
            {formState.funcionarios.map((funcionario, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <select
                        className="selectFuncionarios"
                        value={funcionario.id}
                        onChange={e => mudaFormstateFuncionario(index, e.target.value)}
                    >
                        <option value="">Selecione um funcionário</option>
                        {funcionariosDisponiveis.map(f => (
                            <option key={f.id} value={f.id} >{f.nome}</option>
                        ))}
                    </select>
                    <Botao onClick={() => removeFuncionario(index)} texto="Excluir" corTexto="white" />
                </div>
            ))}
            <Botao onClick={addFuncionario} texto="Adicionar Funcionário" corTexto="white" />
        </div>
    );

    const selectEquipes = () => (
        <div>
            <Textomenor texto="Equipes disponíveis:" />
            <select
                className="select"
                value={formState.equipe}
                onChange={(evento) => mudaFormstate(evento, "equipe")}
            >
                <option value="" disabled>Selecione a equipe </option>
                {["Equipe 1", "Equipe 2", "Equipe 3"].map(equipe => (
                    <option key={equipe} value={equipe}>{equipe}</option>
                ))}
            </select>
        </div>
    );

    return (
        <>
            <Cabecalho />
            <main>
                <section className="lateral7">
                    <Textomaior texto="ADICIONE UMA NOVA ATIVIDADE" corTexto="black" />
                    <form onSubmit={e => e.preventDefault()} className='formularioAtiv'>
                        <Textomenor texto='Título da atividade:' />
                        <Input
                            tipo="text"
                            placeholder="Título da atividade"
                            value={formState.titulo}
                            onChange={e => mudaFormstate(e, "titulo")}
                        />

                        <Textomenor texto="Tipo de alocação:" />
                        <select
                            className="select"
                            value={formState.tipoAlocacao}
                            onChange={e => mudaFormstate(e, "tipoAlocacao")}
                        >
                            <option value="">Quem irá trabalhar nessa atividade?</option>
                            <option value="funcionario">Funcionário</option>
                            <option value="equipe">Equipe</option>
                        </select>

                        {formState.tipoAlocacao === "funcionario" && selectFuncionarios()}
                        {formState.tipoAlocacao === "equipe" && selectEquipes()}

                        <Textomenor texto='Veículos:' />
                        <select className="select" value={formState.veiculo} onChange={e => mudaFormstate(e, "veiculo")}>
                            <option value="">Selecione um veículo</option>
                            <option value="Patrola">Patrola</option>
                            <option value="Retroescavadeira">Retroescavadeira</option>
                        </select>

                        <Textomenor texto='Descrição da atividade:' />

                        <ReactQuill
                            className='textArea'
                            value={formState.descricao}
                            onChange={value => mudaFormstate({ target: { value } }, 'descricao')}
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['link', 'code'],
                                ],
                            }}
                        />


                        <div className='botaoCentralizado'>
                            <Botao className="botaoCentralizado" texto="CRIAR ATIVIDADE" corTexto="white" />
                        </div>
                    </form>
                </section>
                <section className='lateral8'>
                    <div className="table-responsive">
                        <h3 className="mb-2 text-center">Atividades Cadastradas</h3>
                        <div>
                            <h4 className='mb-2 text-center'>"titulo atividade"</h4>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Equipe</th>
                                        <th scope="col">Alocados</th>
                                        <th scope="col">Veiculos</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default CadastroAtividade;
