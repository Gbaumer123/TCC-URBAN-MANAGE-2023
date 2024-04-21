import React, { useState, useEffect } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import { useNavigate } from 'react-router-dom';
import apiFuncionarios from '../../services/apiFuncionarios/apiFuncionarios'
import apiEquipes from '../../services/apiEquipes/apiEquipes'
import "./CadastroFuncionario.css";

const CadastroFuncionario = () => {
  const navigate = useNavigate();
  const [equipes, setEquipes] = useState({});
  const [funcionarios, setFuncionarios] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [equipeSelecionada, setEquipeSelecionada] = useState("");
  const [formState, setFormState] = useState({
    nomeFuncionario: "",
    cargo: "",
    equipe: "",
  });

  const mudaFormState = (evento, chave) => {
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
    if (chave === "equipe") {
      setEquipeSelecionada(evento.target.value);
    }
  };
  
  const adicionaFuncionario = async (evento) => {
    evento.preventDefault();
  
    try {
      await apiFuncionarios.adicionaFuncionario(formState);
      alert('Funcionario salvo com sucesso');
  
    
      await carregarFuncionarios();
  
      // Limpe o estado do formulário após o cadastro
      setFormState({
        nomeFuncionario: "",
        cargo: "",
        equipe: "",
      });
  
    } catch (error) {
      console.log(error);
      alert('Funcionario já cadastrado, Tente Novamente!');
    }
  };
  

  const eventoSubmit = async (evento) => {
    evento.preventDefault();
    if (itemSelecionado) {
      await atualizarFormulario(formState);
    } else {
      await adicionaFuncionario(evento);
    }
  };

  const atualizarFormulario = async (formState) => {
    try {
      await apiFuncionarios.atualizarFuncionario(formState);
      alert('Funcionário editado com sucesso');
    } catch (error) {
      console.error('Erro ao editar o funcionário:', error.message);
      alert('Erro ao editar o funcionário');
    }
    carregarFuncionarios();
    setFormState({
      nomeFuncionario: "",
      cargo: "",
      equipe: "",
    });
  };

  const carregarFuncionarios = async () => {
    try {
      const dados = await apiFuncionarios.listarFuncionarios();
      setFuncionarios(dados);
    } catch (error) {
      console.error('Erro ao carregar os funcionários:', error.message);
      console.log(error);
    }
  };

  const excluirFuncionario = async (id) => {
    try {
      await apiFuncionarios.excluirFuncionario(id);
      const novaLista = funcionarios.filter((funcionario) => funcionario.id !== id);
      setFuncionarios(novaLista);
    } catch (error) {
      console.error('Erro ao excluir o funcionário:', error.message);
      console.log('Resposta da API:', error.response);
    }
  };

  const editarFuncionario = async (id) => {
    try {
      const funcionarioSelecionado = await apiFuncionarios.buscarFuncionarioPorId(id);
      setItemSelecionado(funcionarioSelecionado);
      setFormState(funcionarioSelecionado.resultado[0]);
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
    } catch (error) {
      console.error('Erro ao carregar as equipes:', error.message);
      console.log(error);
    }
  };
  
  useEffect(() => {
    listaEquipes();
    carregarFuncionarios();
  }, []);

  return (
    <>
      <Cabecalho />
      <main>
        <section className='lateral3'>
          <Textomaior texto="ADICIONE UM NOVO FUNCIONÁRIO" corTexto="black" />
          <form method="POST" className="formularioFunc" onSubmit={eventoSubmit}>
            <Textomenor texto='Nome do funcionário:' />
            <Input
              tipo="name"
              placeholder="Nome do funcionário"
              valor={formState.nomeFuncionario}
              onChange={(evento) => mudaFormState(evento, "nomeFuncionario")}
            />
            <Textomenor texto='Cargo:' />
            <Input
              tipo="text"
              placeholder="Cargo"
              valor={formState.cargo}
              onChange={(evento) => mudaFormState(evento, "cargo")}
            />
            <Textomenor texto='Equipe:' />
            <select
              className="select"
              value={formState.equipe}
              onChange={(evento) => mudaFormState(evento, "equipe")}
            >
              <option value="" disabled>Selecione uma equipe</option>
              {Object.keys(equipes).map((id) => (
                <option key={id} value={id}>
                  {equipes[id]}
                </option>
              ))}
            </select>
            <Botao type="submit" texto="CADASTRAR" />
          </form>
        </section>

        <section className='lateral4'>
          <div className="table-responsive">
            <h3 className="mb-4 text-center ">Funcionários Cadastrados</h3>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Nome do Funcionário</th>
                  <th scope="col">Cargo</th>
                  <th scope='col'> Equipe</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((funcionario) => (
                  <tr key={funcionario.id} style={{ backgroundColor: 'white' }}>
                    <td>{funcionario.nomeFuncionario}</td>
                    <td>{funcionario.cargo}</td>
                    <td>{equipes[funcionario.equipe]}</td>
                    <td>
                      <button onClick={() => editarFuncionario(funcionario.id)} className="btn btn-warning me-1">Editar</button>
                      <button onClick={() => excluirFuncionario(funcionario.id)} className="btn btn-danger">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default CadastroFuncionario;
