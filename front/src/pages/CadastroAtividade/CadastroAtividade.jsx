import React, { useState, useEffect } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import "./CadastroAtividade.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
        funcionario: [],
        veiculo: "",
        descricao: "",
    });

    // Define a função para atualizar o estado do formulário
    const mudaFormState = (evento, campo) => {
        let novoValor;

        // Verifica se o campo é 'funcionario' para lidar com a seleção múltipla
        if (campo === 'funcionario') {
            novoValor = Array.from(evento.target.selectedOptions, option => option.value);
        } else {
            novoValor = evento.target.value;
        }

        setFormState((estadoAtual) => ({ ...estadoAtual, [campo]: novoValor }));
    };


    const CriaAtividade = (evento) => {
        evento.preventDefault();

        // Cria um novo objeto de atividade
        const novaAtividade = {
            id: Date.now(),
            titulo: formState.titulo,
            equipe: formState.equipe,
            funcionario: formState.funcionario,
            veiculo: formState.veiculo,
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
            equipe: "",
            funcionario: "",
            veiculo: "",
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
                        <Textomenor texto='Título da atividade:' />
                        <Input
                            tipo="name"
                            placeholder="Titulo da atividade"
                            valor={formState.titulo}
                            onChange={(evento) => mudaFormState(evento, "titulo")}
                        />

                        <Textomenor texto='Equipe:' />
                        <select class="select" value={formState.equipe}
                            onChange={(evento) => mudaFormState(evento, "equipe")}>
                            <option value="" disabled selected>Equipes</option>
                            <option value="Rodoviário">Rodoviário</option>
                            <option value="Obras">Obras</option>
                        </select>

                        <Textomenor texto='Funcionários:' />
                        <select class="select" value={formState.funcionario}
                            onChange={(evento) => mudaFormState(evento, "funcionario")}>
                            <option disabled value >Funcionários</option>
                            <option value="Gabriel">Gabriel</option>
                            <option value="Stephany">Stephany</option>
                        </select>




                        <Textomenor texto='Veículos:' />
                        <select class="select" value={formState.veiculo}
                            onChange={(evento) => mudaFormState(evento, "veiculo")}>
                            <option value="" disabled selected>Veículos</option>
                            <option value="Patrola">Patrola</option>
                            <option value="Retroescavadeira">Retroescavadeira</option>
                        </select>

                        <Textomenor texto='Descrição da atividade:' />
                      
                        <ReactQuill
                            className='textArea'
                            style={{ maxHeight: '15vh', overflow: 'auto' }}
                            value={formState.descricao}
                            onChange={(value) => mudaFormState({ target: { value } }, 'descricao')}
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['link',  'code'],
                                ],
                            }}
                        />

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