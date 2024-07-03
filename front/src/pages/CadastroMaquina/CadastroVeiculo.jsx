import React, { useState, useEffect } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import apiVeiculos from '../../services/apiVeiculos/apiVeiculos';

import "./CadastroVeiculo.css";

const CadastroVeiculos = () => {

  const [veiculos, setVeiculos] = useState([]);

  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [modoEdicao, setModoEdicao] = useState(false);



  const [formState, setFormState] = useState(
    {
      nomeVeiculo: "",
      placa: "",
      renavam: "", //sao chaves que recebem valor
    }
  );
  const mudaFormState = (evento, chave) => {
    //usar essa forma para o tcc
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };

  const cadastraVeiculo = async (evento) => {
    evento.preventDefault();
    console.log(formState)

    /*if (!formState.nomeVeiculo || !formState.placa || !formState.renavam) {
      alert("Todos os campos são obrigatórios!")
      return
    }

    const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
    const placa = 'AAA0A00';

    if (placa.match(regex)) {
      console.log("Placa válida!")
    }
    else{
      alert("Placa inválida!")
    }
    if (formState.renavam < 11 && formState.renavam > 11) {
      alert("Renavam inválido!")
      return
    }
*/

    try {
      await apiVeiculos.adicionaVeiculo(formState);
      console.log(formState)
      alert('Veiculo salvo com sucesso')

      await carregarVeiculos();

    } catch (error) {
      console.log(error)
      alert('Veiculo já cadastrado, Tente Novamente!')
    }

    setFormState({
      nomeVeiculo: "",
      placa: "",
      renavam: "",
    });

  };

  const eventoSubmit = async (evento) => {
    evento.preventDefault();
    if (modoEdicao) {
      console.log(itemSelecionado)
      await atualizarFormulario(formState)
      setModoEdicao(true);
    } else {
      await cadastraVeiculo(evento)
    }
  };

  const atualizarFormulario = async (formState) => {
    try {
      await apiVeiculos.atualizarVeiculo(formState)
      alert('Veiculo editado com sucesso');
    } catch (error) {
      console.error('Erro ao editar o veiculo:', error.message);
      alert('Erro ao editar o veiculo');
    }

    carregarVeiculos();

    setFormState({
      nomeVeiculo: "",
      placa: "",
      renavam: "",
    });
  };


  const carregarVeiculos = async () => {
    try {
      const dados = await apiVeiculos.listarVeiculos();
      setVeiculos(dados);
    } catch (error) {
      console.error('Erro ao carregar os veiculos:', error.message);
      console.log(error)
    }
  };

  const excluirVeiculo = async (id) => {
    try {
      console.log('Tentando excluir veiculo com ID:', id);

      await apiVeiculos.excluirVeiculo(id);



      const novaLista = veiculos.filter((veiculo) => veiculo.id !== id);

      setVeiculos(novaLista);

    } catch (error) {
      console.error('Erro ao excluir o veiculo:', error.message);
      console.log('Resposta da API:', error.response);
    }
  };

  const editarVeiculo = async (id) => {
    try {
      const veiculoSelecionado = await apiVeiculos.buscarVeiculoPorId(id);
      setItemSelecionado(veiculoSelecionado);
      console.log('item:', veiculoSelecionado)
      setFormState(veiculoSelecionado.resultado[0]);

      setModoEdicao(true);

    } catch (error) {
      console.error('Erro ao editar o veiculo:', error.message);
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);




  return (
    <>

      <Cabecalho />
      <main >

        <section className='lateral1'>

          <Textomaior texto="ADICIONE UM NOVO VEÍCULO" corTexto="black" />
          <form method="POST" className='formularioVeic'>
            <Textomenor texto='Nome do veículo:' />
            <Input
              tipo="name"
              placeholder="Nome do veículo"
              valor={formState.nomeVeiculo}
              onChange={(evento) => mudaFormState(evento, "nomeVeiculo")}
            />
            <Textomenor texto='Placa:' />
            <Input
              tipo="text"
              placeholder="Placa"
              valor={formState.placa}
              onChange={(evento) => mudaFormState(evento, "placa")}
            />
            <Textomenor texto='Renavam:' />
            <Input
              tipo="text"
              placeholder="Renavam"
              valor={formState.renavam}
              onChange={(evento) => mudaFormState(evento, "renavam")}
            />


            <Botao onClick={eventoSubmit} texto={modoEdicao ? "SALVAR" : "CADASTRAR"} corTexto="white" />
          </form>

        </section>

        <section className='lateral2'>
          <div className="table-responsive tabelasVeiculos">
            <h3 className="mb-4 text-center ">Veículos Cadastrados</h3>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Nome do veículo</th>
                  <th scope="col">Placa</th>
                  <th scope="col">Renavam</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {veiculos.map((veiculo) => (
                  <tr key={veiculo.id} className="mb-4 border-top border-dark shadow ">
                    <td>{veiculo.nomeVeiculo}</td>
                    <td>{veiculo.placa}</td>
                    <td>{veiculo.renavam}</td>
                    <td>
                      <button onClick={() => editarVeiculo(veiculo.id)} className="btn btn-dark me-1">Editar</button>
                      <button onClick={() => excluirVeiculo(veiculo.id)} className="btn btn-danger">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

      </main>
    </>
  )
}

export default CadastroVeiculos

