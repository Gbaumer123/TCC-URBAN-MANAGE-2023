import React, { useState, useEffect } from 'react';
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import apiAtividades from '../../services/apiAtividades/apiAtividades'
import apiEquipes from '../../services/apiEquipes/apiEquipes'
import apiFuncionarios from '../../services/apiFuncionarios/apiFuncionarios'
import apiVeiculos from '../../services/apiVeiculos/apiVeiculos';
import "./CadastroAtividade.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CadastroAtividade() {

    const [atividades, setAtividades] = useState([]);

    const [itemSelecionado, setItemSelecionado] = useState(null);

    const [equipes, setEquipes] = useState({});

    const [veiculos, setVeiculos] = useState({});

    const [funcionarios, setFuncionarios] = useState({});

    const [modoEdicao, setModoEdicao] = useState(false);

    const [formState, setFormState] = useState({
        titulo: "",
        veiculo: "",
        descricao: "",
        equipe: "",
        funcionarios: [],
        status : "",
    });

    const mudaFormstate = (evento, chave) => {
        const value = evento.target.value;
        setFormState(prev => ({
            ...prev,
            [chave]: value
        }));
    
        // Dispara a listagem de funcionários quando a equipe é selecionada
        if (chave === 'equipe') {
            listaFuncionarios(value);
        }
    };
    


    const mudaFormstateFuncionario = (index, nomeFuncionario) => {
        const updatedFuncionarios = formState.funcionarios.map((funcNome, idx) =>
            idx === index ? nomeFuncionario : funcNome);

        setFormState(prevState => ({ ...prevState, funcionarios: updatedFuncionarios }));
    };


    function stripHtml(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    const adicionaAtividade = async (evento) => {
        evento.preventDefault();
        try {
            const data = {
                titulo: formState.titulo,
                veiculo: formState.veiculo,
                descricao: stripHtml(formState.descricao),
                equipe: formState.equipe,
                // Serialize funcionarios array to a JSON string
                funcionarios: JSON.stringify(formState.funcionarios) || null,
                status: "pendente"
            };
            await apiAtividades.adicionaAtividade(data);
            alert('Atividade salva com sucesso');

            await listaFuncionarios();

            setFormState({
                titulo: "",
                veiculo: "",
                descricao: "",
                equipe: "",
                funcionarios: []
            });

        } catch (error) {
            console.error('Erro ao salvar a atividade:', error);
            alert('Erro ao salvar a atividade. Por favor, tente novamente.');
        }
    };





    const eventoSubmit = async (evento) => {
        evento.preventDefault();
        if (modoEdicao) {
            console.log(itemSelecionado)
            await atualizarFormulario(formState)
            setModoEdicao(true);
        } else {
            await adicionaAtividade(evento)
        }
    };


    const atualizarFormulario = async (formState) => {
        try {
            await apiAtividades.atualizarAtividade(formState);
            alert('Atividade editada com sucesso');
        } catch (error) {
            console.error('Erro ao editar a atividade:', error.message);
            alert('Erro ao editar a atividade');
        }
        carregarAtividades();

        setFormState({
            titulo: "",
            veiculo: "",
            descricao: "",
            equipe: "",
            funcionarios: [],
        });
    };

    const carregarAtividades = async () => {
        try {
            const dados = await apiAtividades.listarAtividades();
            setAtividades(dados);
            console.log(dados)
        } catch (error) {
            console.error('Erro ao carregar os atividades:', error.message);
            console.log(error);
        }
    };

    const excluirAtividade = async (id) => {
        try {
            await apiAtividades.excluirAtividade(id);
            const novaLista = atividades.filter((atividade) => atividade.id !== id);
            setAtividades(novaLista);
        } catch (error) {
            console.error('Erro ao excluir a atividade:', error.message);
            console.log('Resposta da API:', error.response);
        }
    };

    const editarAtividade = async (id) => {
        try {
            const atividadeSelecionada = await apiAtividades.buscarAtividadePorId(id);
            setItemSelecionado(atividadeSelecionada);
            setFormState(atividadeSelecionada.resultado[0]);
        } catch (error) {
            console.error('Erro ao editar o funcionário:', error.message);
        }
    };

    const listaEquipes = async () => {
        try {
            const dados = await apiEquipes.listarEquipes();
            const equipesObject = {};

            dados.forEach((equipe) => {
                equipesObject[equipe.id] = equipe.nomeEquipe;
            });

            setEquipes(equipesObject);
        }
        catch (error) {
            console.error('Erro ao carregar as equipes:', error.message);
            console.log(error);
        }
    };

    const listaVeiculos = async () => {
        try {
            const dados = await apiVeiculos.listarVeiculos();
            const veiculosObject = {};

            dados.forEach((veiculo) => {
                veiculosObject[veiculo.id] = veiculo.nomeVeiculo;
            });

            setVeiculos(veiculosObject);
        }
        catch (error) {
            console.error('Erro ao carregar as veiculos:', error.message);
            console.log(error);
        }
    };


    const addFuncionario = () => {
        setFormState(prevState => ({
            ...prevState,
            funcionarios: [...prevState.funcionarios, null]  // inicia com null ou um id padrão
        }));
    };


    const removeFuncionario = (index) => {
        setFormState(prevState => ({
            ...prevState,
            funcionarios: prevState.funcionarios.filter((_, idx) => idx !== index)
        }));
    };



    const listaFuncionarios = async (equipeId) => {
        if (!equipeId) return;  // Garante que não prossiga se não houver um ID de equipe
        try {
            const dados = await apiFuncionarios.listarFuncionariosPorEquipe(equipeId);
            setFuncionarios(dados.reduce((acc, func) => {
                acc[func.id] = func.nomeFuncionario;
                return acc;
            }, {}));
        } catch (error) {
            console.error('Erro ao carregar os funcionários:', error.message);
        }
    };

    useEffect(() => {
        listaEquipes();
        listaFuncionarios();
        listaVeiculos();
        carregarAtividades();
    }, []);

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

                        <Textomenor texto="Equipes disponíveis:" />
                        <select
                            className="selectAtividades"
                            value={formState.equipe}
                            onChange={(evento) => mudaFormstate(evento, "equipe")}
                        >
                            <option value="" disabled>Selecione a equipe </option>
                            {Object.keys(equipes).map((id) => (
                                <option key={id} value={id}>
                                    {equipes[id]}
                                </option>
                            ))}
                        </select>

                        <div style={{ marginBottom: '15px' }}></div>

                        <Textomenor texto="Funcionários disponíveis:" />
                        {formState.funcionarios.map((nomeFuncionario, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <select
                                    className="selectAtividades"
                                    value={nomeFuncionario}
                                    onChange={(e) => mudaFormstateFuncionario(index, e.target.value)}
                                >
                                    <option value="" disabled>Selecione um funcionário</option>
                                    {Object.values(funcionarios).map((nome) => (
                                        <option key={nome} value={nome}>{nome}</option>  // Aqui estamos passando o nome como valor
                                    ))}
                                </select>
                                <Botao onClick={() => removeFuncionario(index)} texto="Excluir" corTexto="white" />
                            </div>
                        ))}
                        <Botao onClick={addFuncionario} texto="ADICIONAR FUNCIONÁRIO" corTexto="white" />

                        <div style={{ marginBottom: '10px' }}></div>

                        <Textomenor texto='Veículos disponíveis:' />
                        <select className="selectAtividades" value={formState.veiculo} onChange={e => mudaFormstate(e, "veiculo")}>
                        <option value="" disabled>Selecione o veiculo </option>
                            {Object.keys(veiculos).map((id) => (
                                <option key={id} value={id}>
                                    {veiculos[id]}
                                </option>
                            ))}
                        </select>


                        <Textomenor texto='Descrição da atividade:' />

                        <ReactQuill
                            className='textArea'
                            value={formState.descricao}
                            onChange={value => setFormState(prevState => ({ ...prevState, descricao: value }))}
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
                            <Botao onClick={adicionaAtividade} texto="CRIAR ATIVIDADE" corTexto="white" />
                        </div>
                    </form>
                </section>


                <section className='lateral8'>
                    <div className="table-responsive tabelasAtividades">
                        <h3 className="mb-2 text-center">Atividades Cadastradas</h3>
                        {atividades.map((atividade) => (
                            <div key={atividade.id} className="mb-4 border-top border-dark shadow ">
                                <h4 className='mb-2 text-center'>{atividade.titulo}</h4>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Título</th>
                                            <th scope="col">Equipes</th>
                                            <th scope="col">Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr key={atividade.id} style={{ backgroundColor: 'white' }}>
                                            <td>{atividade.titulo}</td>
                                            <td>{atividade.equipe}</td>

                                            <td>
                                                <button onClick={() => editarAtividade(atividade.id)} className="btn btn-secondary me-1">Editar</button>
                                                <button onClick={() => excluirAtividade(atividade.id)} className="btn btn-dark">Excluir</button>
                                            </td>
                                        </tr>

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
