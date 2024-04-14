import React, { useState, useEffect } from 'react';
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import Input from '../../components/Input';
import "./CadastroEquipe.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import apiEquipes from '../../services/apiEquipes/apiEquipes';


const CadastroEquipe = () => {


  const [funcionarios, setFuncionarios] = useState([]);

  const [equipes, setEquipes] = useState([]);

  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [funcionariosPorEquipe, setFuncionariosPorEquipe] = useState({});


  const [formState, setFormState] = useState({
    nomeEquipe: "",
  });

  const mudaFormState = (evento, chave) => {
    //usar essa forma para o tcc
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };


  const cadastraEquipe = async (evento) => {
    evento.preventDefault();
    console.log(formState)

    // Verifica se todos os campos foram preenchidos
    if (!formState.nomeEquipe) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await apiEquipes.adicionaEquipe(formState);
      alert('Equipe salva com sucesso')

      await carregarEquipes();

    } catch (error) {
      alert('Erro, Tente Novamente!')
    }

    // Limpar o formulário
    setFormState({ nomeEquipe: "" });
  };

  const eventoSubmit = async (evento) => {
    evento.preventDefault();
    if (itemSelecionado) {
      console.log(itemSelecionado)
      await atualizarFormulario(formState)
    } else {
      await cadastraEquipe(evento)
    }
  };

  const atualizarFormulario = async (formState) => {
    try {
      await apiEquipes.atualizarEquipe(formState)
      alert('Equipe editada com sucesso');
    } catch (error) {
      console.error('Erro ao editar o equipe:', error.message);
      alert('Erro ao editar o equipe');
    }

    carregarEquipes();

    setFormState({
      nomeEquipe: "",
    });
  };

  const carregarEquipes = async () => {
    try {
      const equipes = await apiEquipes.listarEquipes();
      setEquipes(equipes);

      // Carregar os funcionários de cada equipe
      const funcionariosPorEquipe = {};
      await Promise.all(
        equipes.map(async (equipe) => {
          const funcionarios = await apiEquipes.listarFuncionariosPorEquipe(equipe.id);
          funcionariosPorEquipe[equipe.id] = funcionarios;
        })
      );
      setFuncionariosPorEquipe(funcionariosPorEquipe);
    } catch (error) {
      console.error('Erro ao carregar as equipes:', error.message);
    }
  };

  const excluirEquipe = async (id) => {
    try {
      console.log('Tentando excluir equipe com ID:', id);

      await apiEquipes.excluirEquipe(id);

      const novaLista = equipes.filter((equipe) => equipes.id !== id);

      setEquipes(novaLista);

      carregarEquipes();

    } catch (error) {
      console.error('Erro ao excluir a equipe:', error.message);
      console.log('Resposta da API:', error.response);
    }
  };

  const editarEquipe = async (id) => {
    try {
      const equipeSelecionada = await apiEquipes.buscarEquipePorId(id);
      setItemSelecionado(equipeSelecionada);
      console.log('item:', equipeSelecionada)
      setFormState(equipeSelecionada.resultado[0]);

    } catch (error) {
      console.error('Erro ao editar o equipe:', error.message);
    }
  };

  useEffect(() => {
    carregarEquipes();
  }, []);





  return (
    <>
      <Cabecalho />
      <main>
        <section className='lateral5'>
          <Textomaior texto='ADICIONE UM NOVA EQUIPE' corTexto='black' />
          <form method='POST' className='formularioEquipe'>
            <Textomenor texto='Nome da equipe:' />
            <Input
              tipo='name'
              placeholder='Nome da equipe'
              valor={formState.nomeEquipe}
              onChange={(evento) => setFormState({ ...formState, nomeEquipe: evento.target.value })}
            />
            <Botao type="submit" onClick={eventoSubmit} texto="CADASTRAR" />
          </form>
        </section>

        <section className='lateral6'>
          <div className='table-responsive'>
            <h3 className='mb-4 text-center '>Equipes Cadastradas</h3>
            {equipes.map((equipe) => (
              <tr key={equipe.id} className="mb-4">
                <h4 className='mb-3 text-center'>{equipe.nomeEquipe}</h4>
                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th scope='col'>Nome do Funcionário</th>
                      <th scope='col'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funcionariosPorEquipe[equipe.id]?.map((funcionario) => (
                      <tr key={funcionario.id}>
                        <td>{funcionario.nomeFuncionario}</td>
                        <td>
                          <button className="btn btn-warning me-1">Editar</button>
                          <button className="btn btn-danger">Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <button onClick={() => editarEquipe(equipe.id)} className="btn btn-warning me-1">Editar</button>
                  <button onClick={() => excluirEquipe(equipe.id)} className="btn btn-danger">Excluir</button>
                </div>
              </tr>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default CadastroEquipe;
