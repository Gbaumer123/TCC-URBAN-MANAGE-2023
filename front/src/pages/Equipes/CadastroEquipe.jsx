import React, { useState, useEffect } from 'react';
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import Input from '../../components/Input';
import "./CadastroEquipe.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import apiEquipes from '../../services/apiEquipes/apiEquipes';
import apiFuncionarios from '../../services/apiFuncionarios/apiFuncionarios';

const CadastroEquipe = () => {
  const [equipes, setEquipes] = useState([]);

  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [formState, setFormState] = useState({
    nomeEquipe: "",
  });

  const mudaFormState = (evento, chave) => {
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };

  const cadastraEquipe = async (evento) => {
    evento.preventDefault();

    if (!formState.nomeEquipe) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await apiEquipes.adicionaEquipe(formState);
      alert('Equipe salva com sucesso');
      await carregarEquipes();
    } catch (error) {
      alert('Erro, Tente Novamente!');
    }

    setFormState({ nomeEquipe: "" });
  };

  const eventoSubmit = async (evento) => {
    evento.preventDefault();
    if (itemSelecionado) {
      await atualizarFormulario(formState);
    } else {
      await cadastraEquipe(evento);
    }
  };

  const atualizarFormulario = async (formState) => {
    try {
      await apiEquipes.atualizarEquipe(formState);
      alert('Equipe editada com sucesso');
    } catch (error) {
      console.error('Erro ao editar a equipe:', error.message);
      alert('Erro ao editar a equipe');
    }

    carregarEquipes();

    setFormState({
      nomeEquipe: "",
    });
  };

  const carregarEquipes = async () => {
    try {
      const equipesData = await apiEquipes.listarEquipes();
      console.log("Dados das equipes:", equipesData); // Adicione este console.log
      const equipesComFuncionarios = await Promise.all(
        equipesData.map(async (equipe) => {
          const funcionariosDaEquipe = await apiFuncionarios.listarFuncionariosPorEquipe(equipe.id);
          return { ...equipe, funcionarios: funcionariosDaEquipe };
        })
      );
      setEquipes(equipesComFuncionarios);
    } catch (error) {
      console.error('Erro ao carregar as equipes:', error.message);
    }
  };

  const excluirEquipe = async (id) => {
    try {
      await apiEquipes.excluirEquipe(id);
      const novaLista = equipes.filter((equipe) => equipe.id !== id);
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
      setFormState(equipeSelecionada.resultado[0]);
    } catch (error) {
      console.error('Erro ao editar a equipe:', error.message);
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
          <Textomaior texto='ADICIONE UM NOVA EQUIPE' />
          <form method='POST' className='formularioEquipe'>
            <Textomenor texto='Nome da equipe:' />
            <Input
              tipo='name'
              placeholder='Nome da equipe'
              valor={formState.nomeEquipe}
              onChange={(evento) => mudaFormState(evento, "nomeEquipe")}
            />
            <Botao type="submit" texto="CADASTRAR" onClick={eventoSubmit} />
          </form>
        </section>
        
        <section className='lateral6'>
          <div className='table-responsive tabelasEquipes'>
            <h3 className='mb-4 text-center'>Equipes Cadastradas</h3>
            {equipes.map((equipe) => (
              <>
              <div key={equipe.id} className="mb-4 border-top border-dark shadow ">
                <h4 className='mb-3 text-center'>{equipe.nomeEquipe}</h4>
                <div className="d-flex justify-content-center">
                  <button onClick={() => editarEquipe(equipe.id)} className="btn btn-dark me-1">Editar</button>
                  <button onClick={() => excluirEquipe(equipe.id)} className="btn btn-danger">Excluir</button>
                </div>
                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr >
                      <th scope='col'>Nome do Funcionário</th>
                    </tr>
                  </thead>
                  <tbody >
                    {equipe.funcionarios.map((funcionario) => (
                      <tr key={funcionario.id}>
                        <td>{funcionario.nomeFuncionario}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default CadastroEquipe;
