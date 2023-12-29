import React, { useState, useEffect } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import "./CadastroVeiculo.css";

const CadastroVeiculos = () => {
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

  const cadastraVeiculo = (evento) => {
    evento.preventDefault();

    //manda o nome e cargo digitado para dentro do JSON
    const novoVeiculo = {
      id: Date.now(),
      nomeVeiculo: formState.nomeVeiculo,
      placa: formState.placa,
      renavam: formState.renavam,
    };
    // Recupera o array de maquinas do localStorage ou cria um novo array vazio
    const veiculosStorage = JSON.parse(localStorage.getItem("veiculos")) || [];

    /*verifica se é um array, Se for, ele atribui esse valor à variável 
    "maquinas", caso contrário, atribui um novo array vazio. */
    let veiculos = veiculosStorage;
    if (!Array.isArray(veiculos)) {
      veiculos = [];
    }

    //Adiciona a novo maquina no array
    veiculos.push(novoVeiculo);


    // Salva o array atualizado no localStorage
    localStorage.setItem("veiculos", JSON.stringify(veiculos));

    // Exibe as informações da novo funcionario no console
    console.log(novoVeiculo);

    setFormState({
      nomeVeiculo: "",
      placa: "",
      renavam: "",
    });

  }
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


            <Botao onClick={cadastraVeiculo} texto="CADASTRAR" corTexto="white" />
          </form>

        </section>

        <section className='lateral2'>
          <div className="table-responsive">
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
                  <tr key={veiculo.id} style={{ backgroundColor: 'white' }}>
                    <td>{veiculo.nomeVeiculo}</td>
                    <td>{veiculo.placa}</td>
                    <td>{veiculo.renavam}</td>

                    <td>
                      <button className="btn btn-warning me-2">Editar</button>
                      <button className="btn btn-danger">Excluir</button>
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

